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

- `content/*.ts` — typed business data (services, FAQs, locations, Hadi's profile, nav). `sv` is always populated; `en`/`ar` fields are added per-locale and fall back to `sv` until translated (see `Localized<T>` in `content/types.ts`).
- `i18n/routing.ts` — locale + route registry (canonical Swedish slugs, per-locale path translations).
- `lib/routes.ts` / `lib/service-lookup.ts` — slug resolution and hreflang/canonical URL builders.
- `lib/structured-data/*.ts` — JSON-LD builders (Organization, Service, Person, Article, Breadcrumb, FAQ).
- `config/legacy-redirects.ts` — permanent redirects from the old site's URLs.
- `assets/media-source/` — original legacy assets (untouched, deliberately outside `public/` so they are not deployed); `public/media/optimized/` — WebP derivatives actually used on the site.

## Environment

Copy `.env.example` to `.env.local` and fill in values once a contact-form email provider is chosen (see `lib/email/index.ts` and CLIENT-TODO item 15). Without it, form submissions are logged server-side and still report success.

## SEO & deployment

- `NEXT_PUBLIC_SITE_URL` (`lib/site.ts`) is the single source of truth for every absolute URL the site generates (canonical/hreflang links, sitemap, OG images, JSON-LD `url`/`image` fields). Set it to the production domain in deployment; it falls back to `https://www.economycodes.com` if unset or empty.
- `app/sitemap.ts` emits static pages, all 14 services, and all articles, each with per-locale `alternates.languages` (hreflang, including `x-default`). Static pages share a manually-bumped `STATIC_LAST_MODIFIED` date; service/article entries use `lastReviewed`/`updatedAt` (falling back to `publishedAt`) from their own content data.
- `app/robots.ts` allows all crawling except `/api/` and points to the sitemap.
- `lib/structured-data/*.ts` builds the JSON-LD (Organization, Service, Person, Article, Breadcrumb, FAQ) rendered via `components/seo/JsonLd.tsx`.
