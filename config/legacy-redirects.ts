/**
 * Permanent redirects from legacy economycodes.com static routes to their
 * matching new Swedish page. Populated fully in phase 2 once the exact set of
 * old URLs is confirmed; each entry maps a specific legacy path to the
 * specific new page that replaces it -- never a wildcard/catch-all to "/".
 */
export interface LegacyRedirect {
  source: string;
  destination: string;
  permanent: true;
}

export const legacyRedirects: LegacyRedirect[] = [
  { source: "/service", destination: "/tjanster", permanent: true },
  { source: "/service.html", destination: "/tjanster", permanent: true },
  { source: "/about", destination: "/om-hadi", permanent: true },
  { source: "/about.html", destination: "/om-hadi", permanent: true },
  { source: "/privacy", destination: "/integritetspolicy", permanent: true },
  { source: "/privacy.html", destination: "/integritetspolicy", permanent: true },
  {
    source: "/service/accounting",
    destination: "/tjanster/bokforing",
    permanent: true,
  },
  {
    source: "/service/tax-report",
    destination: "/tjanster/skattedeklaration",
    permanent: true,
  },
  {
    source: "/service/business-registration",
    destination: "/tjanster/foretagsregistrering",
    permanent: true,
  },
  {
    source: "/service/contract-and-contract",
    destination: "/tjanster/avtal-och-kontrakt",
    permanent: true,
  },
  {
    source: "/service/establishment-of-associations",
    destination: "/tjanster/starta-forening",
    permanent: true,
  },
  {
    source: "/service/feasibility-and-budget-studies",
    destination: "/tjanster/affarsplan-och-budget",
    permanent: true,
  },
  {
    source: "/service/investments-in-sweden",
    destination: "/tjanster/etablera-foretag-i-sverige",
    permanent: true,
  },
];
