import { getTranslations } from "next-intl/server";

import { getLocalized } from "@/lib/i18n-content";
import { Hero } from "@/components/marketing/Hero";
import type { SectionProps } from "../types";

export async function HeroSection({ locale, content }: SectionProps) {
  const t = await getTranslations({ locale, namespace: "home" });
  const { text, images } = content;

  return (
    <Hero
      locale={locale}
      eyebrow={getLocalized(text.heroEyebrow, locale)}
      title={getLocalized(text.heroTitle, locale)}
      subtitle={getLocalized(text.heroSubtitle, locale)}
      photo={images.heroPhoto}
      credential={getLocalized(text.firmCredential, locale)}
      primaryCtaLabel={t("heroCtaPrimary")}
      servicesCtaLabel={t("heroCtaServices")}
    />
  );
}
