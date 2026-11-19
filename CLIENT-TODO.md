# CLIENT-TODO

Items below are not yet confirmed and are shown on the live site using clearly neutral placeholder text (never a guess or a fabricated value). Once you confirm a value, tell us which item number and the correct value -- we'll update the corresponding field in `content/*.ts` and the placeholder will disappear everywhere it's shown.

## Legal / registration

1. **Full registered company name, organisation number (org.nr), and legal entity type** (AB / enskild firma / etc.) -- currently shown as a neutral "uppgift bekräftas" placeholder in the Footer and in the Organization structured data (`lib/structured-data/organization.ts` uses the generic `ProfessionalService` type rather than a more specific one, pending this).
2. **VAT number (momsregistreringsnummer)** -- currently omitted from the Footer.

## Hadi Almaani's profile

3. ~~Hadi's exact approved public title.~~ **Resolved:** "Auktoriserad redovisningskonsult & auktoriserad lönekonsult, Economy Codes AB" in all three languages (`content/people.ts`).
4. **Hadi's approved biography, education, certifications, professional memberships, languages spoken, and years of experience** -- currently a short, neutral, non-claiming bio with no numeric or credential claims.
5. ~~Whether Hadi is formally authorised as an Auktoriserad Redovisningskonsult and/or Auktoriserad Lönekonsult.~~ **Resolved:** confirmed as both, via Srf konsulterna; Economy Codes AB is an Srf Auktoriserad Redovisningsbyrå. Now stated on the homepage, About page, location pages and in structured data.
6. ~~Licensing of Hadi's portrait photo (`hadi.jpeg`, carried a studio watermark).~~ **Resolved:** the client supplied a new, watermark-free portrait on 2026-09-28 (`assets/media-source/hadi.jpg`); the old photo has been removed.

## Services

7. **Exact scope of each service** -- including whether payroll, annual accounts/annual reports, VAT returns, employer declarations, personal tax returns, and ongoing advisory are actually offered today. Current service pages describe each of the 7 confirmed topic areas from the old site in general, industry-standard terms, without claiming a specific detailed scope beyond that.
8. **Exact customer segments served** -- sole traders, limited companies, associations, startups, international founders, Arabic-speaking entrepreneurs, or others. The homepage currently lists a general, non-exhaustive "who we help" list.
9. **Geographic service area** -- Mellerud, Trollhättan, Västra Götaland, or all of Sweden via remote service. Not currently stated beyond listing the two office addresses.
10. **Whether contract preparation ("Avtal och kontrakt" page) is legal advice or purely administrative/document support.** The current copy explicitly frames it as administrative/practical support only and includes a disclaimer pointing users to a jurist/advokat for qualified legal advice -- confirm this framing is accurate before it goes live.
11. **Exact scope of the investment/business-establishment service.** The current page explicitly states this is not a migration service and does not imply any guarantee of residence, immigration approval, or citizenship -- confirm this framing is accurate.

## Operations

12. **Whether both the Mellerud and Trollhättan addresses are active offices open to customers**, and whether meetings require an appointment.
13. **Office opening hours** -- currently omitted from both Location cards (shows a neutral "uppgift bekräftas" note) and from structured data.
14. ~~Whether +46 73 479 82 10 is also an approved WhatsApp number.~~ **Resolved:** confirmed as the WhatsApp number; `whatsappHref` is now set in `content/business.ts` and the button appears in the mobile sticky action bar and the desktop floating buttons.
15. **Booking method** -- contact form, a booking link (e.g. Calendly), phone, WhatsApp, or a combination. The contact page/form is built in phase 2; confirm before launch.
16. **Approved social links, Google Business Profile link, testimonials, client logos, accounting-software certifications, and partner logos**, if any exist and are approved for display. None are currently shown beyond the two verified Facebook links (business page and Hadi's personal profile).
17. **Privacy-controller details, cookie/analytics tools in use, and the email address for privacy requests** -- needed to finalize the privacy policy and cookie policy pages (phase 2). **Update:** the privacy policy and terms now cover WhatsApp Business Platform (Meta Cloud API) messaging so the pages can be submitted to Meta. They assume WhatsApp is used for replying to inbound chats and for service messages (reminders, document requests, booking confirmations) to clients who opted in, with no marketing messages and no bot. Please confirm this, along with the email provider behind info@economycodes.com (listed generically as "our email service" under data sharing), and have the texts reviewed. The org.nr (item 1) would strengthen the controller section and is also required for Meta Business Verification. **Update 2026-11-18:** the site now supports Google Analytics 4 via Google Tag Manager, behind a consent banner (nothing is tracked until a visitor clicks "Accept"). The privacy and cookie policies now name GA4/GTM, Google Ireland as processor, the `_ga` cookies and 14-month retention. Please create the GTM container and GA4 property (README "Analytics"), set `NEXT_PUBLIC_GTM_ID` in Vercel, and have the updated texts reviewed.

## Media / legacy assets

18. **Licensing/ownership of the legacy stock photography** used as provisional service-page images (bookkeeping, business registration, contracts, association formation, feasibility/budget, investment). None of these appear to be custom photography of the business; see `assets/media-source/MANIFEST.md` for the full per-file breakdown. Recommend replacing with authentic photography or confirmed-licensed stock over time. **Update 2026-11-13:** two of these photos now illustrate the homepage's Redovisning section (`home-benefits.webp`) and Digital marknadsföring section (`hero.webp`). Replace them under Pages → Home (section images) once licensed or your own photos are available.
19. **The legacy tax-reporting image (`skatterapport.jpeg`) has the Skatteverket logo overlaid on it and has been excluded from the rebuilt site entirely** -- it is not used anywhere, since it would incorrectly imply endorsement by or affiliation with Skatteverket. The Skattedeklaration service page currently has no hero image as a result.

## Structured data

20. **LinkedIn, Google Business Profile, and Srf konsulterna member-directory URLs for structured-data `sameAs` fields** -- `lib/structured-data/organization.ts` and `lib/structured-data/person.ts` currently only list the confirmed Facebook URLs in `sameAs`. Additional verified profile links (company LinkedIn page, Google Business Profile listing, and Hadi's entry in the Srf konsulterna member directory, if public) would strengthen entity verification for AI answer engines and search. Do not add placeholder or guessed URLs -- omit until confirmed, per the pattern used throughout this file.

## Digital marketing

21. **Scope and delivery of the digital marketing services** (website creation, SEO, AEO, GEO, social media ads, Google Ads, social media management, SaaS/MVP development, mobile app development, UI/UX design, custom system development — `content/services-digital.ts`). Please confirm: which of these are offered today, whether they're delivered in-house by Economy Codes or via a partner, the pricing model (fixed price, monthly retainer, hourly), and which ad platforms are managed. The pages currently describe each service in general, industry-standard terms, carry a "no guaranteed results" disclaimer on SEO/AEO/GEO/ads, and make no claims about case studies, client results, certifications (e.g. Google Partner, Meta Business Partner), or prices. Provide any approved case studies or partner badges if they should be shown.

## Accounting software (`/bokforingsprogram`)

Every claim on these pages was checked against the app's code (`economycodes-faktura`, branch `next-features`, 2026-11-12). Screenshots come from the fictional demo company "Demo Installation AB" (`economycodes-faktura/scripts/seed-demo.mjs`, captured with `scripts/capture-app-screenshots.ts`). Publishing status lives in `content/software.ts` (`status: "live" | "pending"`); `SOFTWARE_PREVIEW=1` renders pending pages, always noindexed.

22. **AGI page (`/bokforingsprogram/integrationer/skatteverket`) is now public (2026-11-13), at the site owner's request.** Direct sending is still a per-company pilot flag (`agiSkatteverket`, default off), and the page shows no production screenshots yet. Please confirm that a pilot company has given Economy Codes AB ombud rights and sent and signed a declaration in production. Once it has, screenshot the steps there (not in the mock mode, which shows "Test (simulerad)") and link the page from the payroll page. Until then, consider adding a line saying the feature is enabled per company on request. To hide the page again, set its status back to `pending` in `content/software.ts`.
23. **MCP page (`/bokforingsprogram/integrationer/ai-mcp`) is now public (2026-11-13), at the site owner's request.** The MCP server has not yet been confirmed against a real AI app and a production database. Test it with specific assistants, replace the lead question's answer with a real answer from the demo company, and only then name the tested assistants (the unit tests block assistant names until then). Note: the app's own "AI-anslutningar" page already names Claude and ChatGPT.
24. **Not mentioned anywhere on the site yet:** Peppol e-invoicing (no access point provider connected; sending and receiving both off), Lager (only a stock count; the real module is unmerged), live INK2/årsredovisning filing (blocked in code), WhatsApp invoice sending, pricing and support terms (none exist). Add support copy only from actual service terms.
25. **To confirm before launch:** that production has the ROT/RUT work-details migration (`20261122090000_rot_rut_work`) and the year's tax tables imported; that `https://app.economycodes.com/` remains the login address (verified responding on 2026-11-12); the app label "Returnerande faktura" (pages say "återkommande"); and whether the FAQ "Vi arbetar löpande i Fortnox" (`content/faqs.ts`) and the Fortnox support service should be reworded now that you market your own software.

## Three-offering structure (2026-11-13)

The homepage, navigation and contact form now present three offerings: Redovisning (`/tjanster`), Digital marknadsföring and Bokföringsprogram (`content/offerings.ts`). The new copy reuses facts already on the site, but please confirm:

26. **Homepage headline and positioning.** The H1 is now "Redovisning, bokföringsprogram och marknadsföring för småföretag", with "Srf-auktoriserad redovisningsbyrå" as the eyebrow (previously "Auktoriserad redovisningsbyrå för företag i hela Sverige"). "Redovisningsbyrå för småföretag i hela Sverige" moved to the Redovisning hub (`/tjanster`), which now targets that search instead of listing marketing services too. All of these can be edited in the dashboard.
27. **Redovisning hub copy** (`content/accounting.ts`): the four points under "Redovisning – vi sköter det åt dig" (digital document submission, ongoing booking and reconciliation, payroll/VAT/annual accounts/tax returns, an authorized consultant to ask) and the customer types taken from the existing FAQ (sole traders, limited companies, trading partnerships, non-profit associations, foreign founders). Depends on items 7–9.
28. **Primary CTAs and contact topics.** Redovisning: "Boka en konsultation"; Digital marknadsföring: "Berätta om ditt projekt"; Bokföringsprogram: "Boka en demo" (no self-signup link yet, as there are no published prices or terms; the app's public `/register` page exists). The contact dropdown is grouped by offering, and inquiries arrive with subjects "Konsultationsförfrågan redovisning", "Förfrågan digital marknadsföring" or "Demoförfrågan bokföringsprogram". Confirm the wording and any inbox filters.
29. **Integrations on `/bokforingsprogram`.** The new "Integrationer och filer" section lists only file-based exchanges: SIE 4 import/export, the VAT return file and the ROT/RUT claim file submitted in Skatteverket's e-services, and OCR references and payment QR codes on invoices. Direct AGI sending and the MCP connection stay unpublished (items 22–23).
30. **English and Arabic versions** of the new copy were written alongside the Swedish and should be reviewed by a native speaker, especially the Arabic.

## Software development offering (2026-11-13)

31. **Systemutveckling is now its own offering** (`/systemutveckling`, en `/software-development`, ar `/تطوير-البرمجيات`), with a hub page, a menu dropdown, a homepage card and section, and its own contact topic ("Förfrågan systemutveckling"). It holds SaaS/MVP development, mobile apps, UI/UX design and custom systems, which used to sit under Digital marknadsföring. Webbdesign & hemsidor stays under marketing. The hub copy (`content/development.ts`) only restates what the four service pages already say; please confirm it, along with item 21.
32. **Service URLs now follow their offering.** Accounting services stay at `/tjanster/<slug>`. Marketing services moved to `/digital-marknadsforing/<slug>` and development services to `/systemutveckling/<slug>` (with matching en/ar paths). The old `/tjanster/<slug>` addresses redirect permanently (308) to the new ones. No action is needed, but update any links you have shared elsewhere (ads, Google Business Profile, social bios).

## Contact messages and AI website management (2026-11-19)

33. **Contact-form messages are now also stored** in the site's database (Neon, EU region assumed — please confirm the project's region), in addition to being emailed. They appear under Dashboard → Messages and can be deleted there or through the AI connector. The privacy policy now names Neon as a processor; its retention text ("kept for as long as needed to handle your enquiry") is unchanged. Please confirm a concrete retention period (suggestion: delete messages 24 months after the last contact) so it can be stated in the policy and messages older than that can be deleted.
34. **The website can now be managed from ChatGPT (or Claude) through an MCP connector** at `/api/mcp`, signed in with the dashboard password. It can edit every page, SEO field, FAQ, article, image and the business details, and read and delete contact messages — anyone holding the admin password can do this, so keep it private and change `MCP_OAUTH_SECRET` to sign out every connected app.
