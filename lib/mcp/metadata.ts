import "server-only";

import { MCP_SCOPE } from "@/lib/mcp/oauth";
import { AUTHORIZE_PATH, resourceUrl } from "@/lib/mcp/config";

/** RFC 9728: tells MCP clients which authorization server protects /api/mcp. */
export function protectedResourceMetadata(origin: string) {
  return {
    resource: resourceUrl(origin),
    authorization_servers: [origin],
    scopes_supported: [MCP_SCOPE],
    bearer_methods_supported: ["header"],
    resource_name: "Economy Codes website",
  };
}

/** RFC 8414 (also served as openid-configuration for clients that only look there). */
export function authorizationServerMetadata(origin: string) {
  return {
    issuer: origin,
    authorization_endpoint: `${origin}${AUTHORIZE_PATH}`,
    token_endpoint: `${origin}/api/oauth/token`,
    registration_endpoint: `${origin}/api/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: [
      "none",
      "client_secret_post",
      "client_secret_basic",
    ],
    scopes_supported: [MCP_SCOPE],
  };
}
