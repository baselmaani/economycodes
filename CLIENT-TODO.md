# CLIENT-TODO

Items below are not yet confirmed and are shown on the live site using clearly neutral placeholder text (never a guess or a fabricated value). Once you confirm a value, tell us which item number and the correct value -- we'll update the corresponding field in `content/*.ts` and the placeholder will disappear everywhere it's shown.

## Legal / registration

1. **Full registered company name, organisation number (org.nr), and legal entity type** (AB / enskild firma / etc.) -- currently shown as a neutral "uppgift bekräftas" placeholder in the Footer and in the Organization structured data (`lib/structured-data/organization.ts` uses the generic `ProfessionalService` type rather than a more specific one, pending this).
2. **VAT number (momsregistreringsnummer)** -- currently omitted from the Footer.

## Hadi Almaani's profile

3. **Hadi's exact approved public title** (in Swedish, English, and Arabic) -- currently shown as the generic "Rådgivare, Economy Codes" (`content/people.ts`).
4. **Hadi's approved biography, education, certifications, professional memberships, languages spoken, and years of experience** -- currently a short, neutral, non-claiming bio with no numeric or credential claims.
5. **Whether Hadi is formally authorised as an Auktoriserad Redovisningskonsult and/or Auktoriserad Lönekonsult, and by which organisation.** Nothing of the kind is currently claimed anywhere on the site, and it must not be added without documented proof.
6. **Licensing of Hadi's current portrait photo (`hadi.jpeg`)** -- the file carries a small photo-studio watermark ("Souhail") in the corner. Please confirm the studio/photographer has granted rights to use this specific photo on the rebuilt commercial website, or provide a new portrait without a third-party watermark. See `public/media/source/MANIFEST.md`.

## Services

7. **Exact scope of each service** -- including whether payroll, annual accounts/annual reports, VAT returns, employer declarations, personal tax returns, and ongoing advisory are actually offered today. Current service pages describe each of the 7 confirmed topic areas from the old site in general, industry-standard terms, without claiming a specific detailed scope beyond that.
8. **Exact customer segments served** -- sole traders, limited companies, associations, startups, international founders, Arabic-speaking entrepreneurs, or others. The homepage currently lists a general, non-exhaustive "who we help" list.
9. **Geographic service area** -- Mellerud, Trollhättan, Västra Götaland, or all of Sweden via remote service. Not currently stated beyond listing the two office addresses.
10. **Whether contract preparation ("Avtal och kontrakt" page) is legal advice or purely administrative/document support.** The current copy explicitly frames it as administrative/practical support only and includes a disclaimer pointing users to a jurist/advokat for qualified legal advice -- confirm this framing is accurate before it goes live.
11. **Exact scope of the investment/business-establishment service.** The current page explicitly states this is not a migration service and does not imply any guarantee of residence, immigration approval, or citizenship -- confirm this framing is accurate.

## Operations

12. **Whether both the Mellerud and Trollhättan addresses are active offices open to customers**, and whether meetings require an appointment.
13. **Office opening hours** -- currently omitted from both Location cards (shows a neutral "uppgift bekräftas" note) and from structured data.
14. **Whether +46 73 479 82 10 is also an approved WhatsApp number.** Until confirmed, no WhatsApp link/button appears anywhere on the site (mobile sticky action bar currently shows Call + Contact only).
15. **Booking method** -- contact form, a booking link (e.g. Calendly), phone, WhatsApp, or a combination. The contact page/form is built in phase 2; confirm before launch.
16. **Approved social links, Google Business Profile link, testimonials, client logos, accounting-software certifications, and partner logos**, if any exist and are approved for display. None are currently shown beyond the two verified Facebook links (business page and Hadi's personal profile).
17. **Privacy-controller details, cookie/analytics tools in use, and the email address for privacy requests** -- needed to finalize the privacy policy and cookie policy pages (phase 2).

## Media / legacy assets

18. **Licensing/ownership of the legacy stock photography** used as provisional service-page images (bookkeeping, business registration, contracts, association formation, feasibility/budget, investment). None of these appear to be custom photography of the business; see `public/media/source/MANIFEST.md` for the full per-file breakdown. Recommend replacing with authentic photography or confirmed-licensed stock over time.
19. **The legacy tax-reporting image (`skatterapport.jpeg`) has the Skatteverket logo overlaid on it and has been excluded from the rebuilt site entirely** -- it is not used anywhere, since it would incorrectly imply endorsement by or affiliation with Skatteverket. The Skattedeklaration service page currently has no hero image as a result.
