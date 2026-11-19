import "server-only";

import { getOauthSecret, resourceUrl } from "@/lib/mcp/config";
import { verifyClientId, type RegisteredClient } from "@/lib/mcp/oauth";

/**
 * Validation of an /authorize request, shared by the consent page (GET) and
 * the approve/deny handler (POST), so both apply the same rules.
 */

export interface AuthorizeRequest {
  clientId: string;
  client: RegisteredClient;
  redirectUri: string;
  codeChallenge: string;
  state: string | null;
  resource: string;
}

export type AuthorizeParseResult =
  | { ok: true; request: AuthorizeRequest }
  /** The client or redirect URI can't be trusted: show the error, never redirect. */
  | { ok: false; fatal: string }
  /** The client is known: report the error back to it. */
  | { ok: false; redirect: string };

/** Fields carried from the consent page to the approve handler. */
export const AUTHORIZE_FIELDS = [
  "response_type",
  "client_id",
  "redirect_uri",
  "code_challenge",
  "code_challenge_method",
  "state",
  "scope",
  "resource",
] as const;

function withoutTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function redirectWith(
  redirectUri: string,
  params: Record<string, string | null | undefined>,
): string {
  const url = new URL(redirectUri);
  for (const [key, value] of Object.entries(params)) {
    if (value) url.searchParams.set(key, value);
  }
  return url.toString();
}

export async function parseAuthorizeRequest(
  params: URLSearchParams,
  origin: string,
): Promise<AuthorizeParseResult> {
  const clientId = params.get("client_id");
  const client = await verifyClientId(clientId, getOauthSecret());
  if (!clientId || !client) {
    return {
      ok: false,
      fatal: "Unknown app. Remove the connector and add it again.",
    };
  }
  const redirectUri = params.get("redirect_uri");
  if (!redirectUri || !client.redirectUris.includes(redirectUri)) {
    return { ok: false, fatal: "The app's redirect address doesn't match." };
  }

  const state = params.get("state");
  const fail = (error: string, description: string): AuthorizeParseResult => ({
    ok: false,
    redirect: redirectWith(redirectUri, {
      error,
      error_description: description,
      state,
    }),
  });

  if (params.get("response_type") !== "code") {
    return fail("unsupported_response_type", "Only the code flow is supported");
  }
  const codeChallenge = params.get("code_challenge");
  if (!codeChallenge || params.get("code_challenge_method") !== "S256") {
    return fail("invalid_request", "PKCE with S256 is required");
  }
  const resource = resourceUrl(origin);
  const requested = params.get("resource");
  if (
    requested &&
    withoutTrailingSlash(requested) !== resource &&
    withoutTrailingSlash(requested) !== origin
  ) {
    return fail(
      "invalid_target",
      `This server only issues tokens for ${resource}`,
    );
  }

  return {
    ok: true,
    request: { clientId, client, redirectUri, codeChallenge, state, resource },
  };
}
