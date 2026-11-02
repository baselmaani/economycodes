import { authorizationContent } from "@/content/home";
import { hadi } from "@/content/people";
import { definePage, message, same } from "./types";

/** Icons the credential cards used before they became editable. */
const CREDENTIAL_ICONS = ["UserCheck", "Wallet"] as const;

export const aboutPage = definePage({
  key: "om-hadi",
  label: "About Hadi",
  group: "Pages",
  routeKey: "/om-hadi",
  seo: {
    title: {
      sv: "Hadi Al Maani, redovisningskonsult i Sverige",
      en: "Hadi Al Maani, accountant in Sweden",
      ar: "هادي المعاني، محاسب معتمد في السويد",
    },
    description: {
      sv: "Hadi Al Maani är auktoriserad redovisningskonsult och lönekonsult via Srf konsulterna och driver Economy Codes AB. Service på svenska, engelska och arabiska.",
      en: "Hadi Al Maani is an Srf-authorized accounting and payroll consultant who runs Economy Codes AB. Service in Swedish, English and Arabic.",
      ar: "هادي المعاني مستشار محاسبة ورواتب معتمد من Srf konsulterna ويدير Economy Codes AB. خدمة بالعربية والسويدية والإنجليزية.",
    },
  },
  sections: [
    {
      key: "profile",
      label: "Profile",
      description:
        "Name, title, bio and photos are also used on the profile card on the home, service and article pages.",
    },
    { key: "credentials", label: "Personal authorization" },
    { key: "expertise", label: "Areas of expertise" },
    { key: "languages", label: "Languages" },
    { key: "faq", label: "FAQ" },
    { key: "cta", label: "Final call to action" },
  ],
  text: [
    {
      key: "eyebrow",
      label: "Eyebrow",
      kind: "text",
      section: "profile",
      default: message((m) => m.nav.about),
    },
    {
      key: "name",
      label: "Name (page heading)",
      kind: "plain",
      section: "profile",
      default: same(hadi.name),
    },
    {
      key: "jobTitle",
      label: "Title",
      kind: "text",
      section: "profile",
      default: hadi.title,
    },
    {
      key: "bio",
      label: "Biography",
      kind: "textarea",
      section: "profile",
      default: hadi.bio,
    },
    {
      key: "credentialBadges",
      label: "Credential badges",
      kind: "plain",
      section: "profile",
      hint: "Separate badges with ·",
      default: same(authorizationContent.person.credentials.join(" · ")),
    },
    {
      key: "firmBadge",
      label: "Badge on the photo",
      kind: "plain",
      section: "profile",
      default: same(authorizationContent.firm.credential),
    },
    {
      key: "languagesBadge",
      label: "Languages badge on the photo",
      kind: "plain",
      section: "profile",
      default: same("Svenska · English · العربية"),
    },

    {
      key: "credentialsEyebrow",
      label: "Eyebrow",
      kind: "plain",
      section: "credentials",
      default: same(authorizationContent.issuingBody.name),
    },
    {
      key: "credentialsTitle",
      label: "Heading",
      kind: "text",
      section: "credentials",
      default: message((m) => m.about.credentialsTitle),
    },
    {
      key: "credentialsLead",
      label: "Intro",
      kind: "textarea",
      section: "credentials",
      default: authorizationContent.person.body,
    },

    {
      key: "expertiseTitle",
      label: "Heading",
      kind: "text",
      section: "expertise",
      default: message((m) => m.about.expertiseTitle),
    },
    {
      key: "expertiseLead",
      label: "Intro",
      kind: "textarea",
      section: "expertise",
      default: message((m) => m.about.expertiseLead),
    },
    {
      key: "seeAllServices",
      label: "Button label",
      kind: "text",
      section: "expertise",
      default: message((m) => m.about.seeAllServices),
    },

    {
      key: "languagesTitle",
      label: "Heading",
      kind: "text",
      section: "languages",
      default: message((m) => m.about.languagesTitle),
    },
    {
      key: "languagesLine",
      label: "Languages",
      kind: "plain",
      section: "languages",
      hint: "Separate languages with ·",
      default: same("Svenska · English · العربية"),
    },

    {
      key: "faqTitle",
      label: "Heading",
      kind: "text",
      section: "faq",
      default: message((m) => m.common.faqTitle),
    },

    {
      key: "ctaTitle",
      label: "Heading",
      kind: "text",
      section: "cta",
      default: message((m) => m.about.ctaTitle),
    },
    {
      key: "ctaSubtitle",
      label: "Text",
      kind: "textarea",
      section: "cta",
      default: message((m) => m.about.ctaSubtitle),
    },
  ],
  collections: [
    {
      key: "credentialDetails",
      label: "Credential cards",
      itemLabel: "Credential",
      section: "credentials",
      fields: [
        { key: "icon", label: "Icon", kind: "icon" },
        { key: "label", label: "Credential", kind: "plain" },
        { key: "body", label: "Text", kind: "textarea" },
      ],
      default: authorizationContent.person.credentialDetails.map(
        (credential, index) => ({
          icon: same(CREDENTIAL_ICONS[index] ?? "BadgeCheck"),
          label: same(credential.label),
          body: credential.body,
        }),
      ),
    },
  ],
  images: [
    {
      key: "heroPhoto",
      label: "Hero photo",
      section: "profile",
      hint: "Portrait, about 400:439 (e.g. 800 × 878)",
      default: hadi.heroPhoto,
    },
    {
      key: "photo",
      label: "Small profile photo (profile cards and final call to action)",
      section: "profile",
      hint: "Square",
      default: hadi.photo,
    },
  ],
});
