import type { AppLocale } from "@/i18n/routing";
import { alt, contentType, size } from "@/lib/seo/og-image";
import {
  renderSoftwareOgImage,
  softwareOgStaticParams,
} from "@/lib/seo/software-og-image";

export { alt, contentType, size };

export const generateStaticParams = softwareOgStaticParams;

export default async function Image({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}) {
  const { locale } = await params;
  return renderSoftwareOgImage("overview", locale);
}
