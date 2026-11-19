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
  verifyAuthCode,
  verifyClientId,
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
  const clientId = params.get("client_id");
  const client = await verifyClientId(clientId, secret);
  if (!clientId || !client) {
    return oauthError("invalid_client", "Unknown client_id", 401);
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
