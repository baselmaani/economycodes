import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import type { AppLocale } from "@/i18n/routing";
import {
  assertSoftwarePageVisible,
  buildSoftwareMetadata,
} from "@/lib/software-page";
import { SoftwareSubpage } from "@/components/software/SoftwareSubpage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildSoftwareMetadata("skatteverket", locale);
}

export default async function SkatteverketPage({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  assertSoftwarePageVisible("skatteverket");
  return <SoftwareSubpage pageKey="skatteverket" locale={locale} />;
}
