import "server-only";

import { passwordMatches } from "@/lib/admin/token";
import { verifyAccessToken } from "@/lib/mcp/oauth";

/**
 * Environment and URL helpers shared by the MCP endpoint, the OAuth routes
 * and the consent page.
 */

export const MCP_PATH = "/api/mcp";
export const AUTHORIZE_PATH = "/admin/oauth/authorize";

export function getOauthSecret(): string {
  const secret = process.env.MCP_OAUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("MCP_OAUTH_SECRET must be set (32+ characters)");
  }
  return secret;
}

/** OAuth needs its own secret plus the admin password used on the consent page. */
export function isOauthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_PASSWORD &&
    (process.env.MCP_OAUTH_SECRET?.length ?? 0) >= 32,
  );
}

/** Origin of the request as the client sees it (works on preview deployments too). */
export function originOf(request: Request): string {
  return new URL(request.url).origin;
}

/** Same, for server components and actions, from the forwarded headers. */
export function originFromHeaders(headers: Headers): string {
  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  if (!host) throw new Error("Missing Host header");
  const proto =
    headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
    (host.startsWith("localhost") || host.startsWith("127.0.0.1")
      ? "http"
      : "https");
  return `${proto}://${host}`;
}

/** The MCP endpoint URL: the OAuth "resource" and the access tokens' audience. */
export function resourceUrl(origin: string): string {
  return `${origin}${MCP_PATH}`;
}

export function protectedResourceMetadataUrl(origin: string): string {
  return `${origin}/.well-known/oauth-protected-resource${MCP_PATH}`;
}

/** Permissive CORS: tokens travel in the Authorization header, never in cookies. */
export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Authorization, Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID",
  "Access-Control-Expose-Headers":
    "WWW-Authenticate, Mcp-Session-Id, Mcp-Protocol-Version",
  "Access-Control-Max-Age": "86400",
} as const;

export function withCors(response: Response): Response {
  for (const [name, value] of Object.entries(CORS_HEADERS)) {
    response.headers.set(name, value);
  }
  return response;
}

export function preflight(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

/**
 * True for an OAuth access token issued for this endpoint, or for the
 * optional static MCP_API_TOKEN (Claude Code, MCP Inspector, scripts).
 */
export async function isAuthorizedMcpRequest(
  request: Request,
): Promise<boolean> {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  const token = match[1].trim();

  const staticToken = process.env.MCP_API_TOKEN;
  if (staticToken && staticToken.length >= 32) {
    if (await passwordMatches(token, staticToken)) return true;
  }
  if (!isOauthConfigured()) return false;
  return verifyAccessToken(
    token,
    getOauthSecret(),
    resourceUrl(originOf(request)),
  );
}
