import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import {
  generateServiceMetadata,
  resolveServiceForOffering,
  serviceStaticParams,
  type ServicePageParams,
} from "@/lib/service-page";
import { ServiceDetailPage } from "@/components/page/ServiceDetailPage";

/**
 * Digital marketing service detail pages. Slugs of services from another offering
 * redirect to that offering's route (lib/service-page.ts).
 */
export function generateStaticParams() {
  return serviceStaticParams("marknadsforing");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<ServicePageParams>;
}): Promise<Metadata> {
  return generateServiceMetadata(params, "marknadsforing");
}

export default async function ServicePage({
  params,
}: {
  params: Promise<ServicePageParams>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const service = resolveServiceForOffering(locale, slug, "marknadsforing");

  return <ServiceDetailPage locale={locale} service={service} />;
}
