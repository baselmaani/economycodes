import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

import { hasDatabase } from "@/lib/db";
import {
  isAuthorizedMcpRequest,
  originOf,
  preflight,
  protectedResourceMetadataUrl,
  withCors,
} from "@/lib/mcp/config";
import { createMcpServer } from "@/lib/mcp/server";

/**
 * Remote MCP endpoint (Streamable HTTP, stateless) for managing the site's
 * content from ChatGPT, Claude and other MCP clients. Auth: an OAuth access
 * token from /api/oauth/token, or MCP_API_TOKEN. See README → "AI connector".
 */

export const maxDuration = 60;

function unauthorized(request: Request): Response {
  const metadata = protectedResourceMetadataUrl(originOf(request));
  return withCors(
    Response.json(
      { error: "invalid_token", error_description: "Sign in to connect" },
      {
        status: 401,
        headers: {
          "WWW-Authenticate": `Bearer resource_metadata="${metadata}"`,
        },
      },
    ),
  );
}

export async function POST(request: Request) {
  if (!(await isAuthorizedMcpRequest(request))) return unauthorized(request);
  if (!hasDatabase) {
    return withCors(
      Response.json(
        { error: "DATABASE_URL is not configured" },
        { status: 503 },
      ),
    );
  }

  // Stateless: a fresh server and transport per request (serverless-friendly).
  const server = createMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: undefined,
    enableJsonResponse: true,
  });
  await server.connect(transport);
  try {
    return withCors(await transport.handleRequest(request));
  } finally {
    void server.close();
  }
}

/** No server-initiated streams or sessions in stateless mode. */
function methodNotAllowed(request: Request): Response {
  if (!request.headers.get("authorization")) return unauthorized(request);
  return withCors(
    Response.json(
      {
        jsonrpc: "2.0",
        error: { code: -32000, message: "Method not allowed" },
        id: null,
      },
      { status: 405, headers: { Allow: "POST, OPTIONS" } },
    ),
  );
}

export const GET = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const OPTIONS = preflight;
