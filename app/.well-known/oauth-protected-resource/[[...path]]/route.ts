import { originOf, preflight, withCors } from "@/lib/mcp/config";
import { protectedResourceMetadata } from "@/lib/mcp/metadata";

/** Served at /.well-known/oauth-protected-resource and …/api/mcp (the path-suffixed form). */
export function GET(request: Request) {
  return withCors(Response.json(protectedResourceMetadata(originOf(request))));
}

export const OPTIONS = preflight;
