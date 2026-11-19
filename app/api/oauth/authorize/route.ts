import { isAdmin } from "@/lib/admin/session";
import { passwordMatches } from "@/lib/admin/token";
import {
  AUTHORIZE_PATH,
  getOauthSecret,
  isOauthConfigured,
  originOf,
} from "@/lib/mcp/config";
import {
  AUTHORIZE_FIELDS,
  parseAuthorizeRequest,
  redirectWith,
} from "@/lib/mcp/authorize";
import { signAuthCode } from "@/lib/mcp/oauth";
import { isRateLimited } from "@/lib/rate-limit";

/**
 * Form target of the consent page (app/admin/oauth/authorize). Approving
 * needs a dashboard session or the admin password; the answer goes back to
 * the client's redirect URI with a 303.
 */
export async function POST(request: Request) {
  if (!isOauthConfigured()) {
    return new Response("MCP OAuth is not configured", { status: 503 });
  }
  const origin = originOf(request);
  const form = await request.formData();
  const params = new URLSearchParams();
  for (const field of AUTHORIZE_FIELDS) {
    const value = form.get(field);
    if (typeof value === "string" && value) params.set(field, value);
  }

  const parsed = await parseAuthorizeRequest(params, origin);
  if (!parsed.ok) {
    if ("redirect" in parsed) return seeOther(parsed.redirect);
    return new Response(parsed.fatal, { status: 400 });
  }
  const { request: auth } = parsed;

  if (form.get("decision") !== "approve") {
    return seeOther(
      redirectWith(auth.redirectUri, {
        error: "access_denied",
        error_description: "The request was declined",
        state: auth.state,
      }),
    );
  }

  if (!(await isAdmin())) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown";
    const password = form.get("password");
    const backToForm = (error: string) => {
      const url = new URL(AUTHORIZE_PATH, origin);
      params.forEach((value, key) => url.searchParams.set(key, value));
      url.searchParams.set("error", error);
      return seeOther(url.toString());
    };
    if (isRateLimited(`mcp-authorize:${ip}`)) return backToForm("rate");
    if (
      typeof password !== "string" ||
      !(await passwordMatches(password, process.env.ADMIN_PASSWORD!))
    ) {
      return backToForm("password");
    }
  }

  const code = await signAuthCode(getOauthSecret(), {
    clientId: auth.clientId,
    redirectUri: auth.redirectUri,
    codeChallenge: auth.codeChallenge,
    resource: auth.resource,
  });
  return seeOther(redirectWith(auth.redirectUri, { code, state: auth.state }));
}

function seeOther(location: string) {
  return new Response(null, {
    status: 303,
    headers: { Location: location, "Cache-Control": "no-store" },
  });
}
