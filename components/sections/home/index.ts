import type { ComponentType } from "react";

import type { HomeSectionKey } from "@/lib/cms/pages/home";
import type { SectionProps } from "../types";
import { AboutSection } from "./AboutSection";
import { BenefitsSection } from "./BenefitsSection";
import { ContactSection } from "./ContactSection";
import { DigitalSection } from "./DigitalSection";
import { FaqSection } from "./FaqSection";
import { HeroSection } from "./HeroSection";
import { LanguagesSection } from "./LanguagesSection";
import { NationwideSection } from "./NationwideSection";
import { ProcessSection } from "./ProcessSection";
import { ServicesSection } from "./ServicesSection";
import { TrustSection } from "./TrustSection";
import { WhySection } from "./WhySection";

/**
 * Homepage sections by their key in lib/cms/pages/home.ts. To add one: create
 * the component here, register it below, and add the section (and its fields)
 * to the registry (the type check fails until both match). Order and
 * visibility come from the dashboard.
 */
export const homeSections = {
  hero: HeroSection,
  trust: TrustSection,
  why: WhySection,
  services: ServicesSection,
  nationwide: NationwideSection,
  process: ProcessSection,
  digital: DigitalSection,
  about: AboutSection,
  languages: LanguagesSection,
  benefits: BenefitsSection,
  faq: FaqSection,
  contact: ContactSection,
} satisfies Record<HomeSectionKey, ComponentType<SectionProps>>;
