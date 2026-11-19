import type { Metadata } from "next";
import Image from "next/image";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { isAdmin } from "@/lib/admin/session";
import { isOauthConfigured, originFromHeaders } from "@/lib/mcp/config";
import { AUTHORIZE_FIELDS, parseAuthorizeRequest } from "@/lib/mcp/authorize";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = { title: "Connect an app" };

const ERRORS: Record<string, string> = {
  password: "Wrong password.",
  rate: "Too many attempts. Wait a minute and try again.",
};

/**
 * OAuth consent screen for MCP clients (ChatGPT, Claude). Outside the
 * (dashboard) group so it renders without a session; approving needs the
 * session or the admin password (checked in app/api/oauth/authorize).
 */
export default async function AuthorizePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const raw = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "string") params.set(key, value);
  }

  if (!isOauthConfigured()) {
    return (
      <Shell title="Not available">
        <p className="text-destructive text-sm">
          Set <code>MCP_OAUTH_SECRET</code> (32+ characters) and{" "}
          <code>ADMIN_PASSWORD</code> to let apps connect.
        </p>
      </Shell>
    );
  }

  const parsed = await parseAuthorizeRequest(
    params,
    originFromHeaders(await headers()),
  );
  if (!parsed.ok) {
    if ("redirect" in parsed) redirect(parsed.redirect);
    return (
      <Shell title="Can't connect">
        <p className="text-destructive text-sm">{parsed.fatal}</p>
      </Shell>
    );
  }

  const { client, redirectUri } = parsed.request;
  const signedIn = await isAdmin();
  const error = ERRORS[params.get("error") ?? ""];
  const appName = client.clientName || "An app";

  return (
    <Shell title={`Connect ${appName}?`}>
      <p className="text-muted-foreground mb-4 text-sm">
        <strong className="text-foreground">{appName}</strong> wants full access
        to the website content: it will be able to edit and delete pages,
        articles, FAQs and images, and read contact-form messages.
      </p>
      <p className="text-muted-foreground mb-6 text-xs break-all">
        You will be sent back to {new URL(redirectUri).host}.
      </p>
      <form
        method="post"
        action="/api/oauth/authorize"
        className="flex flex-col gap-4"
      >
        {AUTHORIZE_FIELDS.map((field) => {
          const value = params.get(field);
          return value ? (
            <input key={field} type="hidden" name={field} value={value} />
          ) : null;
        })}
        {!signedIn && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Dashboard password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
            />
          </div>
        )}
        {error && (
          <p role="alert" className="text-destructive text-sm">
            {error}
          </p>
        )}
        <div className="flex gap-2">
          <Button type="submit" name="decision" value="approve">
            Allow access
          </Button>
          <Button
            type="submit"
            name="decision"
            value="deny"
            variant="outline"
            formNoValidate
          >
            Cancel
          </Button>
        </div>
      </form>
    </Shell>
  );
}

function Shell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="bg-card border-border w-full max-w-md rounded-2xl border p-8 shadow-sm">
        <Image
          src="/media/optimized/logo-horizontal.webp"
          alt="Economy Codes"
          width={144}
          height={60}
          className="mb-6"
        />
        <h1 className="mb-3 text-xl font-semibold">{title}</h1>
        {children}
      </div>
    </main>
  );
}
