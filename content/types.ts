export type Locale = "sv" | "en" | "ar";

/**
 * `sv` is always required; `en`/`ar` are added in phase 3. A field simply
 * being absent (not an empty string) is how "not yet translated" is
 * represented, so callers must fall back to `sv` explicitly -- see
 * `getLocalized()` in lib/i18n-content.ts.
 */
export type Localized<T> = { sv: T } & Partial<Record<"en" | "ar", T>>;

export interface MediaRef {
  src: string;
  width: number;
  height: number;
  alt: Localized<string>;
}

export interface BusinessIdentity {
  legalName: string;
  brandName: string;
  /** Undefined until the client confirms it -- see CLIENT-TODO.md item 1. */
  orgNumber?: string;
  /** Undefined until the client confirms it -- see CLIENT-TODO.md item 2. */
  vatNumber?: string;
  /** Undefined until the client confirms it -- see CLIENT-TODO.md item 3. */
  legalEntityType?: string;
  phone: string;
  phoneHref: string;
  email: string;
  /** Only set once the client confirms the number is WhatsApp-enabled (CLIENT-TODO item 10). */
  whatsappHref?: string;
  socials: {
    facebook: string;
    hadiFacebook: string;
  };
}

export interface Location {
  id: string;
  name: Localized<string>;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  mapsHref: string;
  /** Undefined until the client confirms opening hours -- CLIENT-TODO item 11. */
  openingHours?: Localized<string>;
  /** Undefined until the client confirms this office takes walk-in customers -- CLIENT-TODO item 2 (offices). */
  isCustomerFacing?: boolean;
}

export interface PersonProfile {
  id: "hadi-al-maani";
  name: string;
  title: Localized<string>;
  bio: Localized<string>;
  photo: MediaRef;
  socials: {
    facebook: string;
  };
}

export type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; media: MediaRef; caption?: string }
  | { type: "disclaimer"; text: string };

export interface ServiceFaqRef {
  id: string;
}

export interface Service {
  key: string;
  order: number;
  slug: Localized<string>;
  name: Localized<string>;
  /** 40-70 word direct summary shown near the top of the page. */
  summary: Localized<string>;
  whoItsFor: Localized<string[]>;
  whatsIncluded: Localized<string[]>;
  process: Localized<string[]>;
  whatToPrepare: Localized<string[]>;
  body: Localized<ContentBlock[]>;
  faqIds: string[];
  heroImage?: MediaRef;
  lastReviewed: string;
}

export interface Faq {
  id: string;
  question: Localized<string>;
  answer: Localized<string>;
  scope: "global" | { serviceKey: string };
}

export interface NavLink {
  routeKey: string;
  label: Localized<string>;
  children?: NavLink[];
}
