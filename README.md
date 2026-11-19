# Economy Codes — website

Next.js (App Router) rebuild of the Economy Codes marketing site. Swedish (default, unprefixed), English (`/en`), and Arabic (`/ar`, RTL).

See [`CLIENT-TODO.md`](./CLIENT-TODO.md) for every fact that still needs client confirmation before launch, and [`assets/media-source/MANIFEST.md`](./assets/media-source/MANIFEST.md) for legacy-asset licensing notes.

## Commands

```bash
npm run dev         # start the dev server at http://localhost:3000
npm run build        # production build
npm run start        # run the production build (after `build`)
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run test         # Vitest unit tests
npm run test:e2e     # Playwright smoke tests (builds + starts the app itself)
npm run verify       # lint + typecheck + test, the pre-ship gate
```

English/Arabic content currently exists for every page built so far (homepage, all 14 service pages, About Hadi, Contact, legal pages) — see `content/*.ts` `Localized<T>` fields. Any future page should follow the same pattern.

## Structure

The site is organised around three offerings, defined once in `content/offerings.ts` (labels, "who does the work" line, primary CTA, contact topic) and used by the homepage, navigation, footer and contact form:

| Offering               | Hub route                                      | Content                                                              | Primary CTA                                                          |
| ---------------------- | ---------------------------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Redovisning            | `/tjanster` (`app/[locale]/tjanster/page.tsx`) | `content/accounting.ts`, `content/services.ts`                       | Boka en konsultation → `/kontakt?amne=redovisning`                   |
| Digital marknadsföring | `/digital-marknadsforing`                      | `content/digital-marketing.ts`, `content/services-digital.ts`        | Berätta om ditt projekt → `/kontakt?amne=marknadsforing`             |
| Bokföringsprogram      | `/bokforingsprogram`                           | `content/software.ts` (registry), `content/software-pages.ts` (copy) | Boka en demo → `/kontakt?amne=demo`; Logga in → app.economycodes.com |

- `components/page/` — shared building blocks for landing and detail pages: `PageHero`, `PageBreadcrumbs` (visible trail + BreadcrumbList JSON-LD from one list), `ContactActions`, `CtaBand`, `FaqBlock` (accordion + FAQPage JSON-LD), `ProcessSteps`, `CheckList`, `ServiceCatalogJsonLd`.
- `components/software/`, `components/sections/home/` — offering- and homepage-specific sections.
- `content/inquiries.ts` + `lib/contact-links.ts` — contact-form topics and the `?amne=` links that preselect them (`components/forms/ContactInquiryPrefill.tsx`). `?amne=<service key>` preselects a single service.
- `content/*.ts` — typed business data (services, FAQs, locations, Hadi's profile, nav). `sv` is always populated; `en`/`ar` fields are added per-locale and fall back to `sv` until translated (see `Localized<T>` in `content/types.ts`).
- `i18n/routing.ts` — locale + route registry (canonical Swedish slugs, per-locale path translations).
- `lib/routes.ts` / `lib/service-lookup.ts` — slug resolution and hreflang/canonical URL builders.
- `lib/structured-data/*.ts` — JSON-LD builders (Organization, Service, Person, Article, Breadcrumb, FAQ).
- `config/legacy-redirects.ts` — permanent redirects from the old site's URLs.
- `assets/media-source/` — original legacy assets (untouched, deliberately outside `public/` so they are not deployed); `public/media/optimized/` — WebP derivatives actually used on the site.

## Environment

Copy `.env.example` to `.env.local` and fill in values once a contact-form email provider is chosen (see `lib/email/index.ts` and CLIENT-TODO item 15). Without it, form submissions are logged server-side and still report success.

## Admin dashboard (`/admin`)

Password-protected dashboard for editing page SEO/text/images, managing articles (JSON import + form editor) and a media library. Content in `content/*.ts` stays the default; the database only stores overrides for pages, plus the articles themselves.

- **Env:** `DATABASE_URL` (Neon), `BLOB_READ_WRITE_TOKEN` (Vercel Blob), `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET` (32+ chars). Without `DATABASE_URL` the site renders the static `content/` data and the dashboard shows a setup notice.
- **Setup:** `npm run db:migrate` (tables in `drizzle/`), then `npm run cms:seed` to copy `content/articles/*` into the database (`-- --force` overwrites existing rows). After schema changes in `lib/db/schema.ts`, run `npm run db:generate`.
- **Code:** `lib/cms/pages/` is the registry of editable page fields (add a field there, then read it via `getPageContent()` in the page); `lib/cms/content.ts` holds the cached public reads; `lib/cms/service/` holds every write (validation, DB, cache invalidation), shared by the dashboard's server actions (which invalidate via `updateTag()`) and the AI connector (`revalidateTag(tag, { expire: 0 })`); `lib/cms/schemas.ts` defines the article JSON format (download a template from the import page).
- **Messages:** contact-form submissions are stored in `contact_submissions` (best effort, alongside the email) and listed under Dashboard → Messages.

## AI connector (MCP, `/api/mcp`)

A remote [MCP](https://modelcontextprotocol.io) server that lets ChatGPT, Claude or any MCP client manage the site's content: pages and SEO (including services, offices, legal and accounting-software pages), home section order, business details, FAQs, articles, images and contact messages. It calls the same services as the dashboard, so the same validation applies and changes go live immediately.

- **Env:** `MCP_OAUTH_SECRET` (32+ chars) turns on OAuth; `ADMIN_PASSWORD` is what you type on the consent screen. Requires `DATABASE_URL` (and `BLOB_READ_WRITE_TOKEN` for image uploads). Run `npm run db:migrate` once for the messages table.
- **ChatGPT:** Settings → Apps & Connectors → Advanced settings → enable Developer mode, then Create: name "Economy Codes website", URL `https://www.economycodes.com/api/mcp`, authentication OAuth. ChatGPT registers itself, opens the consent page (`/admin/oauth/authorize`) and asks for the dashboard password. In a chat, enable the connector under the + menu → Developer mode.
- **Claude:** claude.ai → Settings → Connectors → Add custom connector with the same URL (OAuth). Claude Code: `claude mcp add --transport http economycodes https://www.economycodes.com/api/mcp` (OAuth in the browser), or with `--header "Authorization: Bearer $MCP_API_TOKEN"` if `MCP_API_TOKEN` is set.
- **Test locally:** `npm run dev`, then `npx @modelcontextprotocol/inspector` → Streamable HTTP, `http://localhost:3000/api/mcp`, with the `MCP_API_TOKEN` as Bearer token (or use its OAuth flow).
- **Security:** OAuth 2.1 with PKCE and dynamic client registration, all stateless JWTs (`lib/mcp/oauth.ts`): access tokens last 1 hour, refresh tokens 30 days. Rotating `MCP_OAUTH_SECRET` revokes every connected app. Destructive tools are annotated so clients ask before running them.
- **Code:** `app/api/mcp/route.ts` (endpoint), `lib/mcp/server.ts` + `lib/mcp/tools/*` (tools), `app/api/oauth/*`, `app/.well-known/*` and `app/admin/oauth/authorize` (OAuth). Add a tool by calling a `lib/cms/service/*` function, never the DB directly.

## Analytics (Google Tag Manager + GA4)

Set `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` in Vercel (Production) and redeploy. Without it, no tracking script, consent banner or "Cookie settings" link is rendered. Code: `lib/analytics.ts`, `components/analytics/`.

- **Consent:** Google Consent Mode v2. Everything starts denied; the banner (`CookieConsent`) grants `analytics_storage` only after "Accept" and stores the choice in localStorage (`ec-consent`). Ad storage stays denied. The Footer's "Cookie settings" reopens the banner.
- **dataLayer events:** `phone_click`, `whatsapp_click`, `email_click` (param `link_location`: `sticky_bar`, `floating`, `hero`, `cta`, `contact_methods`, `menu`, `footer`, `about_hero`, `about_cta`, or `content`), `generate_lead` (params `form_name`, `inquiry_topic`) and `consent_update`. Clicks are caught by one delegated listener (`ContactClickTracker`); mark a new button area with `data-track-location="…"`.

GTM / GA4 setup:

1. In GA4, create a property for `www.economycodes.com` and copy the Measurement ID (`G-…`). Under Data settings → Data retention, choose 14 months.
2. In GTM, create a Web container, copy its `GTM-…` ID and set it as `NEXT_PUBLIC_GTM_ID`.
3. Add a **Google tag** with the `G-…` ID, triggered on _Initialization – All Pages_.
4. Variables → New → _Data Layer Variable_: `link_location`, `inquiry_topic`.
5. Triggers → New → _Custom Event_, event name `phone_click|whatsapp_click|email_click|generate_lead` with "Use regex matching" on.
6. Tags → New → _Google Analytics: GA4 Event_, Measurement ID `G-…`, event name `{{Event}}`, parameters `link_location` = `{{link_location}}` and `inquiry_topic` = `{{inquiry_topic}}`, fired by the trigger from step 5.
7. Preview with Tag Assistant, accept the banner, click Call/WhatsApp and send the form, then Submit/Publish the container.
8. In GA4 Admin → Events (after the events have arrived), mark `phone_click`, `whatsapp_click` and `generate_lead` as **key events**. Under Custom definitions, register `link_location` and `inquiry_topic` as event-scoped custom dimensions. To import them into Google Ads later, link GA4 to Google Ads and import the key events.

## SEO & deployment

- `NEXT_PUBLIC_SITE_URL` (`lib/site.ts`) is the single source of truth for every absolute URL the site generates (canonical/hreflang links, sitemap, OG images, JSON-LD `url`/`image` fields). Set it to the production domain in deployment; it falls back to `https://www.economycodes.com` if unset or empty.
- `app/sitemap.ts` emits static pages, all 14 services, and all articles, each with per-locale `alternates.languages` (hreflang, including `x-default`). Static pages share a manually-bumped `STATIC_LAST_MODIFIED` date; service/article entries use `lastReviewed`/`updatedAt` (falling back to `publishedAt`) from their own content data.
- `app/robots.ts` allows all crawling except `/api/` and points to the sitemap.
- `lib/structured-data/*.ts` builds the JSON-LD (Organization, Service, Person, Article, Breadcrumb, FAQ) rendered via `components/seo/JsonLd.tsx`.

## Adding pages

Keep copy in `content/` with `sv`, `en` and `ar` (Swedish first; the others fall back to Swedish until translated), and only publish claims that are verified (see `CLIENT-TODO.md`).

- **New accounting or marketing service:** add it to `content/services.ts` (or `content/services-digital.ts`), its SEO entry to `content/service-meta.ts`, its icon and group to `content/service-icons.ts`, and any FAQs to `content/faqs.ts` with `scope: { serviceKey }`. The `/tjanster/[slug]` route, the right hub, navigation, contact topics, sitemap and llms.txt pick it up automatically.
- **New software feature page:** add a pathname to `i18n/routing.ts`, an entry to `softwarePages` in `content/software.ts` (start with `status: "pending"`; preview with `SOFTWARE_PREVIEW=1`), copy to `softwareSubpages` in `content/software-pages.ts`, SEO defaults in `lib/cms/pages/software.ts`, and a route file that renders `<SoftwareSubpage pageKey="…" />` (copy `app/[locale]/bokforingsprogram/lon/`). Set `status: "live"` once the feature is verified in production.
- **New landing page:** add the pathname to `i18n/routing.ts`, a CMS page to `lib/cms/pages/` (title, description, H1, lead), and compose the route from `components/page/` (`PageHero` with `PageBreadcrumbs`, sections, `FaqBlock`, `CtaBand`). Add it to `app/sitemap.ts` and `app/llms.txt/route.ts`, and to `content/nav.ts` if it belongs in the menu. Use `getInquiryHref()`/`getContactHref()` for CTAs so the form arrives preselected.
- **Changing a public URL:** add a permanent redirect to `config/legacy-redirects.ts` and update internal links; canonicals, hreflang and the sitemap are generated from `i18n/routing.ts`.
