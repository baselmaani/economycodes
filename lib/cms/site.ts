import "server-only";

import { cache } from "react";

import type {
  BusinessIdentity,
  Faq,
  Location,
  PersonProfile,
} from "@/content/types";
import { business as staticBusiness } from "@/content/business";
import { locations as staticLocations } from "@/content/locations";
import { hadi } from "@/content/people";
import { getPageContent } from "@/lib/cms/content";
import { BUSINESS_KEY, FAQS_KEY, faqScopeFromString } from "@/lib/cms/pages";

/**
 * Site-wide data that the dashboard can edit (Business info, FAQs, Hadi's
 * profile), merged over content/. Each call is cached per request and tagged
 * per registry key, like getPageContent().
 */

/** Digits and a leading +, for tel: links. */
function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export const getBusiness = cache(async (): Promise<BusinessIdentity> => {
  const { text } = await getPageContent(BUSINESS_KEY);
  const phone = text.phone.sv;
  const whatsappDigits = text.whatsapp.sv.replace(/\D/g, "");
  return {
    ...staticBusiness,
    phone,
    phoneHref: phoneHref(phone),
    email: text.email.sv,
    whatsappHref: whatsappDigits
      ? `https://wa.me/${whatsappDigits}`
      : undefined,
    orgNumber: text.orgNumber.sv || undefined,
    vatNumber: text.vatNumber.sv || undefined,
    socials: {
      facebook: text.facebook.sv,
      hadiFacebook: text.hadiFacebook.sv,
    },
  };
});

export const getLocations = cache(async (): Promise<Location[]> => {
  const { collections } = await getPageContent(BUSINESS_KEY);
  const offices = collections.offices;
  return staticLocations.map((location, index) => {
    const office = offices[index];
    if (!office) return location;
    return {
      ...location,
      name: office.name,
      streetAddress: office.streetAddress.sv,
      postalCode: office.postalCode.sv,
      city: office.city.sv,
      mapsHref: office.mapsHref.sv,
      // Coordinates belong to the coded address; drop them if the address
      // was changed in the dashboard rather than pin the wrong building.
      geo:
        office.streetAddress.sv === location.streetAddress
          ? location.geo
          : undefined,
      openingHours: office.openingHours.sv ? office.openingHours : undefined,
    };
  });
});

/** Every FAQ in dashboard order. */
export const getFaqs = cache(async (): Promise<Faq[]> => {
  const { collections } = await getPageContent(FAQS_KEY);
  return collections.items.map((item) => ({
    id: item.id.sv,
    scope: faqScopeFromString(item.scope.sv),
    question: item.question,
    answer: item.answer,
  }));
});

/** FAQs by id, in the given order; ids deleted in the dashboard are skipped. */
export async function getFaqsByIds(ids: readonly string[]): Promise<Faq[]> {
  const faqs = await getFaqs();
  return ids
    .map((id) => faqs.find((faq) => faq.id === id))
    .filter((faq) => faq !== undefined);
}

/** Hadi's profile as edited on the About page (also used on profile cards and JSON-LD). */
export const getPerson = cache(async (): Promise<PersonProfile> => {
  const [{ text, images }, business] = await Promise.all([
    getPageContent("om-hadi"),
    getBusiness(),
  ]);
  return {
    ...hadi,
    name: text.name.sv,
    title: text.jobTitle,
    bio: text.bio,
    photo: images.photo,
    heroPhoto: images.heroPhoto,
    socials: { facebook: business.socials.hadiFacebook },
  };
});
