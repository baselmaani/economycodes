import { passwordMatches } from "@/lib/admin/token";
import {
  getOauthSecret,
  isOauthConfigured,
  originOf,
  preflight,
  resourceUrl,
  withCors,
} from "@/lib/mcp/config";
import {
  issueTokens,
  pkceMatches,
  resolveClient,
  staticClientSecret,
  verifyAuthCode,
  verifyRefreshToken,
} from "@/lib/mcp/oauth";

/** OAuth token endpoint: authorization_code (with PKCE) and refresh_token grants. */
export async function POST(request: Request) {
  if (!isOauthConfigured()) {
    return oauthError(
      "temporarily_unavailable",
      "MCP OAuth is not configured",
      503,
    );
  }
  const params = await readParams(request);
  if (!params) return oauthError("invalid_request", "Unreadable request body");

  const secret = getOauthSecret();
  const credentials = clientCredentials(request, params);
  const clientId = credentials.clientId;
  const client = await resolveClient(clientId, secret);
  if (!clientId || !client) {
    return oauthError("invalid_client", "Unknown client_id", 401);
  }
  // The fixed client (dashboard → AI connector) must prove it has the secret.
  if (
    client.isStatic &&
    !(
      credentials.clientSecret &&
      (await passwordMatches(
        credentials.clientSecret,
        await staticClientSecret(secret),
      ))
    )
  ) {
    return oauthError("invalid_client", "Invalid client credentials", 401);
  }
  const resource = resourceUrl(originOf(request));

  switch (params.get("grant_type")) {
    case "authorization_code": {
      const code = await verifyAuthCode(params.get("code"), secret);
      if (
        !code ||
        code.clientId !== clientId ||
        code.redirectUri !== params.get("redirect_uri") ||
        code.resource !== resource
      ) {
        return oauthError("invalid_grant", "Invalid or expired code");
      }
      if (
        !(await pkceMatches(params.get("code_verifier"), code.codeChallenge))
      ) {
        return oauthError("invalid_grant", "PKCE verification failed");
      }
      return tokenResponse(await issueTokens(secret, { clientId, resource }));
    }
    case "refresh_token": {
      const refresh = await verifyRefreshToken(
        params.get("refresh_token"),
        secret,
      );
      if (
        !refresh ||
        refresh.clientId !== clientId ||
        refresh.resource !== resource
      ) {
        return oauthError("invalid_grant", "Invalid or expired refresh token");
      }
      return tokenResponse(await issueTokens(secret, { clientId, resource }));
    }
    default:
      return oauthError(
        "unsupported_grant_type",
        "Use authorization_code or refresh_token",
      );
  }
}

/** client_secret_basic (Authorization header) or client_secret_post / none (body). */
function clientCredentials(
  request: Request,
  params: URLSearchParams,
): { clientId: string | null; clientSecret: string | null } {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Basic\s+(.+)$/i);
  if (match) {
    try {
      const decoded = Buffer.from(match[1].trim(), "base64").toString("utf8");
      const colon = decoded.indexOf(":");
      if (colon > 0) {
        return {
          clientId: decodeURIComponent(decoded.slice(0, colon)),
          clientSecret: decodeURIComponent(decoded.slice(colon + 1)),
        };
      }
    } catch {
      // Fall through to the body.
    }
  }
  return {
    clientId: params.get("client_id"),
    clientSecret: params.get("client_secret"),
  };
}

/** Form-encoded per the spec; JSON accepted too. */
async function readParams(request: Request): Promise<URLSearchParams | null> {
  try {
    const type = request.headers.get("content-type") ?? "";
    if (type.includes("application/json")) {
      const body = (await request.json()) as Record<string, unknown>;
      return new URLSearchParams(
        Object.entries(body)
          .filter(([, value]) => typeof value === "string")
          .map(([key, value]) => [key, value as string]),
      );
    }
    return new URLSearchParams(await request.text());
  } catch {
    return null;
  }
}

function tokenResponse(body: object) {
  return withCors(
    Response.json(body, {
      headers: { "Cache-Control": "no-store", Pragma: "no-cache" },
    }),
  );
}

function oauthError(error: string, description: string, status = 400) {
  return withCors(
    Response.json(
      { error, error_description: description },
      { status, headers: { "Cache-Control": "no-store" } },
    ),
  );
}

export const OPTIONS = preflight;
