import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { AppLocale, StaticAppPathname } from "@/i18n/routing";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { getLocalized } from "@/lib/i18n-content";
import { business } from "@/content/business";
import { locations } from "@/content/locations";
import { footerLegalNav, footerNav } from "@/content/nav";
import { Placeholder } from "@/components/common/Placeholder";
import { Container } from "@/components/layout/Container";

export async function Footer({ locale }: { locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy relative text-white">
      <div
        aria-hidden="true"
        className="via-brand-accent absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
      />
      <Container size="wide">
        <div className="grid gap-10 py-14 sm:py-16 md:grid-cols-4">
          <div className="flex flex-col gap-4 md:col-span-1">
            <Image
              src="/media/optimized/logo-stacked.webp"
              alt={business.brandName}
              width={120}
              height={120}
              className="h-16 w-16"
            />
            <p className="text-sm text-white/70">{business.legalName}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white/90">
              {t("navTitle")}
            </h3>
            <ul className="flex flex-col gap-2">
              {footerNav.map((link) => (
                <li key={link.routeKey}>
                  <Link
                    href={link.routeKey as StaticAppPathname}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {getLocalized(link.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white/90">
              {t("contactTitle")}
            </h3>
            <ul className="flex flex-col gap-2 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Phone size={14} aria-hidden="true" />
                <a href={business.phoneHref} className="hover:text-white">
                  <span dir="ltr">{business.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} aria-hidden="true" />
                <a
                  href={`mailto:${business.email}`}
                  className="hover:text-white"
                >
                  {business.email}
                </a>
              </li>
              {locations.map((location) => (
                <li key={location.id}>
                  <a
                    href={location.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="ltr"
                    className="block text-start hover:text-white"
                  >
                    {location.streetAddress}, {location.postalCode}{" "}
                    {location.city}
                  </a>
                </li>
              ))}
              <li className="flex flex-wrap items-center gap-2 pt-1">
                <span>Org.nr:</span>
                {business.orgNumber ?? (
                  <Placeholder className="border-white/30 bg-white/5 text-white/70" />
                )}
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <span>VAT:</span>
                {business.vatNumber ?? (
                  <Placeholder className="border-white/30 bg-white/5 text-white/70" />
                )}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-white/90">
              {t("legalTitle")}
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLegalNav.map((link) => (
                <li key={link.routeKey}>
                  <Link
                    href={link.routeKey as StaticAppPathname}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {getLocalized(link.label, locale)}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-6 mb-3 text-sm font-semibold text-white/90">
              {t("followTitle")}
            </h3>
            <a
              href={business.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex text-white/70 hover:text-white"
            >
              <FacebookIcon size={20} />
            </a>
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        &copy; {year} {business.legalName}. {t("rightsReserved")}
      </div>
    </footer>
  );
}
