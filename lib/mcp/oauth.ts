import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * Stateless OAuth 2.1 for the MCP endpoint (ChatGPT/Claude connectors):
 * registered clients, authorization codes, access and refresh tokens are all
 * HS256 JWTs signed with MCP_OAUTH_SECRET, so no tables are needed. Each
 * carries a `use` claim that is checked on verify, so one kind can never be
 * replayed as another. The secret is separate from ADMIN_SESSION_SECRET, so
 * an MCP token is never accepted as a dashboard session (whose verifier only
 * checks `role`). Rotating the secret signs out every connected app.
 *
 * Kept free of next/* imports so it can be unit tested directly.
 */

export const CODE_TTL_SECONDS = 5 * 60;
export const ACCESS_TTL_SECONDS = 60 * 60;
export const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 30;
export const MCP_SCOPE = "cms";

type TokenUse = "client" | "code" | "access" | "refresh";

function key(secret: string): Uint8Array {
  if (secret.length < 32) {
    throw new Error("MCP_OAUTH_SECRET must be at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

async function sign(
  secret: string,
  use: TokenUse,
  claims: JWTPayload,
  ttlSeconds?: number,
): Promise<string> {
  const jwt = new SignJWT({ ...claims, use })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt();
  if (ttlSeconds) jwt.setExpirationTime(`${ttlSeconds}s`);
  return jwt.sign(key(secret));
}

async function verify(
  token: string | undefined | null,
  secret: string,
  use: TokenUse,
  audience?: string,
): Promise<JWTPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(secret), {
      algorithms: ["HS256"],
      ...(audience && { audience }),
    });
    return payload.use === use ? payload : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Dynamic client registration (RFC 7591): the client_id *is* the registration.

/** https anywhere; plain http only for loopback (local MCP inspectors). */
export function isAllowedRedirectUri(value: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.hash) return false;
  if (url.protocol === "https:") return true;
  return (
    url.protocol === "http:" &&
    ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)
  );
}

export interface RegisteredClient {
  redirectUris: string[];
  clientName: string;
}

export function signClientId(
  secret: string,
  client: RegisteredClient,
): Promise<string> {
  return sign(secret, "client", {
    redirect_uris: client.redirectUris,
    client_name: client.clientName,
  });
}

export async function verifyClientId(
  clientId: string | undefined | null,
  secret: string,
): Promise<RegisteredClient | null> {
  const payload = await verify(clientId, secret, "client");
  if (!payload || !Array.isArray(payload.redirect_uris)) return null;
  return {
    redirectUris: payload.redirect_uris.filter(
      (uri): uri is string => typeof uri === "string",
    ),
    clientName:
      typeof payload.client_name === "string" ? payload.client_name : "",
  };
}

// ---------------------------------------------------------------------------
// Authorization codes (PKCE S256 only)

export interface AuthCode {
  clientId: string;
  redirectUri: string;
  codeChallenge: string;
  resource: string;
}

export function signAuthCode(secret: string, code: AuthCode): Promise<string> {
  return sign(
    secret,
    "code",
    {
      cid: code.clientId,
      redirect_uri: code.redirectUri,
      code_challenge: code.codeChallenge,
      resource: code.resource,
    },
    CODE_TTL_SECONDS,
  );
}

export async function verifyAuthCode(
  code: string | undefined | null,
  secret: string,
): Promise<AuthCode | null> {
  const payload = await verify(code, secret, "code");
  if (
    !payload ||
    typeof payload.cid !== "string" ||
    typeof payload.redirect_uri !== "string" ||
    typeof payload.code_challenge !== "string" ||
    typeof payload.resource !== "string"
  ) {
    return null;
  }
  return {
    clientId: payload.cid,
    redirectUri: payload.redirect_uri,
    codeChallenge: payload.code_challenge,
    resource: payload.resource,
  };
}

function base64Url(bytes: ArrayBuffer): string {
  return Buffer.from(bytes)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/** RFC 7636 S256: BASE64URL(SHA256(verifier)) === challenge. */
export async function pkceMatches(
  verifier: string | undefined | null,
  challenge: string,
): Promise<boolean> {
  if (!verifier || !/^[A-Za-z0-9\-._~]{43,128}$/.test(verifier)) return false;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(verifier),
  );
  return base64Url(digest) === challenge;
}

// ---------------------------------------------------------------------------
// Access and refresh tokens

export interface TokenPair {
  access_token: string;
  token_type: "Bearer";
  expires_in: number;
  refresh_token: string;
  scope: string;
}

/** `resource` is the MCP endpoint URL; access tokens are only valid for it (aud). */
export async function issueTokens(
  secret: string,
  { clientId, resource }: { clientId: string; resource: string },
): Promise<TokenPair> {
  const claims = { cid: clientId, sub: "admin", aud: resource };
  const [access, refresh] = await Promise.all([
    sign(secret, "access", claims, ACCESS_TTL_SECONDS),
    sign(secret, "refresh", { ...claims, resource }, REFRESH_TTL_SECONDS),
  ]);
  return {
    access_token: access,
    token_type: "Bearer",
    expires_in: ACCESS_TTL_SECONDS,
    refresh_token: refresh,
    scope: MCP_SCOPE,
  };
}

export async function verifyAccessToken(
  token: string | undefined | null,
  secret: string,
  resource: string,
): Promise<boolean> {
  const payload = await verify(token, secret, "access", resource);
  return payload?.sub === "admin";
}

export async function verifyRefreshToken(
  token: string | undefined | null,
  secret: string,
): Promise<{ clientId: string; resource: string } | null> {
  const payload = await verify(token, secret, "refresh");
  if (
    !payload ||
    payload.sub !== "admin" ||
    typeof payload.cid !== "string" ||
    typeof payload.resource !== "string"
  ) {
    return null;
  }
  return { clientId: payload.cid, resource: payload.resource };
}
