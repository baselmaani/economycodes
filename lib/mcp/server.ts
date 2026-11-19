import "server-only";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import { routing } from "@/i18n/routing";
import { getOverview } from "@/lib/cms/admin";
import { countLeads } from "@/lib/cms/leads";
import { CMS_ICON_NAMES } from "@/lib/cms/icons";
import { pageDefs } from "@/lib/cms/pages";
import { faqScopeOptions } from "@/lib/cms/service/faqs";
import { siteUrl } from "@/lib/site";
import { SOFTWARE_SHOT_IDS } from "@/content/software-shot-ids";
import { registerArticleTools } from "./tools/articles";
import { registerMediaTools } from "./tools/media";
import { registerMessageTools } from "./tools/messages";
import { registerPageTools } from "./tools/pages";
import { registerSettingsTools } from "./tools/settings";
import { ok, safe } from "./tools/util";

const INSTRUCTIONS = `Content management for the Economy Codes website (an accounting firm in Sweden; languages: Swedish "sv" (main), English "en", Arabic "ar").

How content works:
- Every page has coded default content. Edits are stored as an "override" on top: anything not overridden shows the default. Changes go live immediately.
- Pages (incl. the 25 service pages, office pages, legal pages, accounting-software pages and SEO titles/descriptions): list_pages → get_page_schema → get_page → update_page.
- Business contact details and offices: get_business_settings / update_business_settings. FAQs: list_faqs, create_faq, update_faq, delete_faq.
- Articles (blog): list_articles, get_article, create_article, update_article, set_article_status, delete_article.
- Images: upload_media_from_url / upload_media_base64, then use the returned "mediaRef" in update_page or an article.
- Contact-form messages: list_messages, get_message, set_message_status, delete_message.

Guidelines: Swedish text is required; add English and Arabic when you can (otherwise Swedish is shown). Before a destructive action (delete, reset, replace) confirm with the user. Not editable here: URL slugs and names of services, the site's navigation and UI labels (code changes).`;

export function createMcpServer(): McpServer {
  const server = new McpServer(
    { name: "economycodes-website", version: "1.0.0" },
    { instructions: INSTRUCTIONS },
  );

  server.registerTool(
    "get_site_overview",
    {
      title: "Site overview (start here)",
      description:
        "Counts of articles, images and messages, recent edits, the languages, and the reference values other tools accept (FAQ scopes, icon names, screenshot ids).",
      inputSchema: {},
      annotations: { readOnlyHint: true },
    },
    safe(async () => {
      const [overview, messages] = await Promise.all([
        getOverview(),
        // Missing until `npm run db:migrate` creates contact_submissions.
        countLeads().catch(() => "unavailable (run the database migration)"),
      ]);
      const groups: Record<string, number> = {};
      for (const def of pageDefs)
        groups[def.group] = (groups[def.group] ?? 0) + 1;
      return ok({
        siteUrl,
        languages: routing.locales,
        defaultLanguage: routing.defaultLocale,
        articles: { published: overview.published, drafts: overview.drafts },
        images: overview.media,
        messages,
        editablePages: groups,
        recentlyEditedArticles: overview.recentArticles.map((article) => ({
          id: article.id,
          title: article.title.sv,
          status: article.status,
          modifiedAt: article.modifiedAt.toISOString(),
        })),
        recentlyEditedPages: overview.recentPages.map((page) => ({
          key: page.key,
          modifiedAt: page.modifiedAt.toISOString(),
        })),
        reference: {
          faqScopes: faqScopeOptions(),
          iconNames: CMS_ICON_NAMES,
          softwareScreenshotIds: SOFTWARE_SHOT_IDS,
        },
      });
    }),
  );

  registerPageTools(server);
  registerSettingsTools(server);
  registerArticleTools(server);
  registerMediaTools(server);
  registerMessageTools(server);
  return server;
}
