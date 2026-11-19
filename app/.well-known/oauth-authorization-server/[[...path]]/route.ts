import { originOf, preflight, withCors } from "@/lib/mcp/config";
import { authorizationServerMetadata } from "@/lib/mcp/metadata";

export function GET(request: Request) {
  return withCors(
    Response.json(authorizationServerMetadata(originOf(request))),
  );
}

export const OPTIONS = preflight;
