import {
  getOauthSecret,
  isOauthConfigured,
  preflight,
  withCors,
} from "@/lib/mcp/config";
import { isAllowedRedirectUri, signClientId } from "@/lib/mcp/oauth";

/**
 * RFC 7591 dynamic client registration. Stateless: the returned client_id is
 * a signed token holding the redirect URIs, checked again on /authorize.
 */
export async function POST(request: Request) {
  if (!isOauthConfigured()) {
    return oauthError(
      "temporarily_unavailable",
      "MCP OAuth is not configured",
      503,
    );
  }
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return oauthError("invalid_client_metadata", "Body must be JSON");
  }

  const redirectUris = Array.isArray(body.redirect_uris)
    ? body.redirect_uris.filter((uri): uri is string => typeof uri === "string")
    : [];
  if (redirectUris.length === 0 || redirectUris.length > 10) {
    return oauthError(
      "invalid_redirect_uri",
      "Provide between 1 and 10 redirect_uris",
    );
  }
  const invalid = redirectUris.find((uri) => !isAllowedRedirectUri(uri));
  if (invalid) {
    return oauthError(
      "invalid_redirect_uri",
      `Redirect URIs must use https (or http on localhost): ${invalid}`,
    );
  }
  const clientName =
    typeof body.client_name === "string"
      ? body.client_name.slice(0, 100)
      : "MCP client";

  const clientId = await signClientId(getOauthSecret(), {
    redirectUris,
    clientName,
  });
  return withCors(
    Response.json(
      {
        client_id: clientId,
        client_id_issued_at: Math.floor(Date.now() / 1000),
        client_name: clientName,
        redirect_uris: redirectUris,
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
        token_endpoint_auth_method: "none",
      },
      { status: 201 },
    ),
  );
}

function oauthError(error: string, description: string, status = 400) {
  return withCors(
    Response.json({ error, error_description: description }, { status }),
  );
}

export const OPTIONS = preflight;
