import type { BusinessIdentity } from "./types";

/**
 * Verified facts only. Anything not confirmed by the client (org number, VAT
 * number, legal entity type) is left undefined -- see CLIENT-TODO.md. Never
 * fill these in with a guess.
 */
export const business: BusinessIdentity = {
  legalName: "Economy Codes",
  brandName: "Economy Codes",
  orgNumber: undefined,
  vatNumber: undefined,
  legalEntityType: undefined,
  phone: "+46 73 479 82 10",
  phoneHref: "tel:+46734798210",
  email: "info@economycodes.com",
  whatsappHref: "https://wa.me/46734798210",
  socials: {
    facebook: "https://facebook.com/economycodes",
    hadiFacebook: "https://www.facebook.com/hadi.maani",
  },
};
