import { getTranslations } from "next-intl/server";

import { getLocalized } from "@/lib/i18n-content";
import { getPerson } from "@/lib/cms/site";
import { offeringList } from "@/content/offerings";
import { Hero } from "@/components/marketing/Hero";
import { offeringIcons } from "@/components/marketing/offering-icons";
import type { SectionProps } from "../types";

export async function HeroSection({ locale, content }: SectionProps) {
  const [t, person] = await Promise.all([
    getTranslations({ locale, namespace: "home" }),
    getPerson(),
  ]);
  const { text, images } = content;

  return (
    <Hero
      locale={locale}
      eyebrow={getLocalized(text.heroEyebrow, locale)}
      title={getLocalized(text.heroTitle, locale)}
      subtitle={getLocalized(text.heroSubtitle, locale)}
      entries={offeringList.map((offering) => ({
        key: offering.key,
        href: offering.route,
        label: getLocalized(offering.label, locale),
        description: getLocalized(offering.whoDoesIt, locale),
        icon: offeringIcons[offering.key],
      }))}
      entriesLabel={t("heroEntriesLabel")}
      contactLabel={t("heroCtaPrimary")}
      // Falls back to Hadi's hero photo from the About page.
      photo={images.heroPhoto ?? person.heroPhoto}
      credential={getLocalized(text.firmCredential, locale)}
    />
  );
}
