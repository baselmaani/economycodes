# Economy Codes — website

Next.js (App Router) rebuild of the Economy Codes marketing site. Swedish (default, unprefixed), English (`/en`), and Arabic (`/ar`, RTL).

See [`CLIENT-TODO.md`](./CLIENT-TODO.md) for every fact that still needs client confirmation before launch, and [`public/media/source/MANIFEST.md`](./public/media/source/MANIFEST.md) for legacy-asset licensing notes.

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

English/Arabic content currently exists for every page built so far (homepage, all 7 service pages, About Hadi, Contact, legal pages) — see `content/*.ts` `Localized<T>` fields. Any future page should follow the same pattern.

## Structure

- `content/*.ts` — typed business data (services, FAQs, locations, Hadi's profile, nav). `sv` is always populated; `en`/`ar` fields are added per-locale and fall back to `sv` until translated (see `Localized<T>` in `content/types.ts`).
- `i18n/routing.ts` — locale + route registry (canonical Swedish slugs, per-locale path translations).
- `lib/routes.ts` / `lib/service-lookup.ts` — slug resolution and hreflang/canonical URL builders.
- `lib/structured-data/*.ts` — JSON-LD builders (Organization, Service, Person, Article, Breadcrumb, FAQ).
- `config/legacy-redirects.ts` — permanent redirects from the old site's URLs.
- `public/media/source/` — original legacy assets (untouched); `public/media/optimized/` — WebP derivatives actually used on the site.

## Environment

Copy `.env.example` to `.env.local` and fill in values once a contact-form email provider is chosen (see `lib/email/index.ts` and CLIENT-TODO item 15). Without it, form submissions are logged server-side and still report success.
