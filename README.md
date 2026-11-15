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
- **Code:** `lib/cms/pages/` is the registry of editable page fields (add a field there, then read it via `getPageContent()` in the page); `lib/cms/content.ts` holds the cached public reads, invalidated by the dashboard's server actions via `updateTag()`; `lib/cms/schemas.ts` defines the article JSON format (download a template from the import page).

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
