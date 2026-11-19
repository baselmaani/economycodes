import type { Metadata } from "next";
import { headers } from "next/headers";

import {
  getOauthSecret,
  isOauthConfigured,
  originFromHeaders,
  resourceUrl,
} from "@/lib/mcp/config";
import { STATIC_CLIENT_ID, staticClientSecret } from "@/lib/mcp/oauth";
import { CopyField } from "@/components/admin/CopyField";
import { PageHeader } from "@/components/admin/PageHeader";

export const metadata: Metadata = { title: "AI connector" };

/**
 * Connection details for the MCP endpoint: server URL plus the fixed OAuth
 * Client ID / Secret for Claude or ChatGPT custom connectors. Behind the
 * dashboard session (see the (dashboard) layout).
 */
export default async function ConnectorPage() {
  const serverUrl = resourceUrl(originFromHeaders(await headers()));
  const description =
    "Let Claude or ChatGPT edit the website's pages, articles, FAQs and images, and read contact messages.";

  if (!isOauthConfigured()) {
    return (
      <>
        <PageHeader title="AI connector" description={description} />
        <div className="border-destructive/30 bg-destructive/5 max-w-2xl rounded-2xl border p-6 text-sm">
          Set <code>MCP_OAUTH_SECRET</code> (32+ characters) and{" "}
          <code>ADMIN_PASSWORD</code> in the environment, then redeploy.
        </div>
      </>
    );
  }

  const clientSecret = await staticClientSecret(getOauthSecret());

  return (
    <>
      <PageHeader title="AI connector" description={description} />
      <div className="flex max-w-2xl flex-col gap-6">
        <section className="bg-card border-border flex flex-col gap-4 rounded-2xl border p-6">
          <h2 className="font-semibold">Credentials</h2>
          <CopyField id="server-url" label="Server URL" value={serverUrl} />
          <CopyField
            id="client-id"
            label="OAuth Client ID"
            value={STATIC_CLIENT_ID}
          />
          <CopyField
            id="client-secret"
            label="OAuth Client Secret"
            value={clientSecret}
            secret
          />
          <p className="text-muted-foreground text-xs">
            Keep the secret private. Changing <code>MCP_OAUTH_SECRET</code>{" "}
            creates a new one and disconnects every app.
          </p>
        </section>

        <section className="bg-card border-border rounded-2xl border p-6 text-sm">
          <h2 className="mb-3 font-semibold">Claude</h2>
          <ol className="text-muted-foreground list-decimal space-y-1 ps-5">
            <li>claude.ai → Settings → Connectors → Add custom connector.</li>
            <li>
              Name it &quot;Economy Codes website&quot; and paste the Server
              URL.
            </li>
            <li>
              Open Advanced settings and paste the OAuth Client ID and Client
              Secret.
            </li>
            <li>
              Click Add, then Connect. On the sign-in page, enter the dashboard
              password and click Allow access.
            </li>
          </ol>
        </section>

        <section className="bg-card border-border rounded-2xl border p-6 text-sm">
          <h2 className="mb-3 font-semibold">ChatGPT</h2>
          <ol className="text-muted-foreground list-decimal space-y-1 ps-5">
            <li>
              Settings → Apps &amp; Connectors → Advanced settings → turn on
              Developer mode.
            </li>
            <li>
              Create a connector, paste the Server URL and choose OAuth as the
              authentication.
            </li>
            <li>Paste the OAuth Client ID and Client Secret, then Create.</li>
            <li>
              On the sign-in page, enter the dashboard password and click Allow
              access. In a chat, turn the connector on from the + menu.
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}
