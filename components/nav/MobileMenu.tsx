"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Home,
  Calculator,
  Layers,
  LogIn,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import {
  isRtlLocale,
  type AppLocale,
  type StaticAppPathname,
} from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import type { ServiceRoute } from "@/lib/service-lookup";
import { getServiceIcon, type ServiceGroup } from "@/content/service-icons";
import type { OfferingKey } from "@/content/offerings";
import { offeringIcons } from "@/components/marketing/offering-icons";
import { business as brand } from "@/content/business";
import type { ContactLinks } from "@/content/types";
import { primaryNav } from "@/content/nav";
import { APP_LOGIN_URL } from "@/content/software";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/nav/NavLink";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const navIcons: Record<string, LucideIcon> = {
  "/": Home,
  "/digital-marknadsforing": TrendingUp,
  "/om-hadi": UserRound,
  "/kontakt": Mail,
};

const ROW_CLASS =
  "group hover:bg-muted/70 data-[active]:bg-secondary data-[active]:text-secondary-foreground flex items-center gap-3 rounded-xl px-2 py-2 text-base font-medium transition-colors data-[active]:font-semibold";

function RowChevron() {
  return (
    <ChevronRight
      size={16}
      aria-hidden="true"
      className="text-muted-foreground/60 group-data-[active]:text-primary ms-auto shrink-0 rtl:rotate-180"
    />
  );
}

function NavRowIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="bg-secondary text-primary group-data-[active]:bg-primary group-data-[active]:text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors">
      <Icon size={16} aria-hidden="true" />
    </span>
  );
}

/** One service link, already localized and resolved to its offering's route by the server Header. */
export interface MobileServiceLink {
  key: string;
  name: string;
  href: { pathname: ServiceRoute; params: { slug: string } };
}

/** Already localized by the server Header, so the full service content stays out of this bundle. */
export interface MobileServiceGroup {
  group: ServiceGroup;
  label: string;
  services: MobileServiceLink[];
}

/** A flat offering accordion (marketing, development): hub link, then its services. */
export interface MobileOfferingMenu {
  key: OfferingKey;
  label: string;
  hubRoute: StaticAppPathname;
  hubLabel: string;
  services: MobileServiceLink[];
}

/** One accounting-software page for the mobile accordion, already localized. */
export interface MobileSoftwareLink {
  routeKey: StaticAppPathname;
  label: string;
  summary: string;
}

export function MobileMenu({
  locale,
  business,
  serviceGroups,
  offeringMenus,
  softwareLinks,
  logInLabel,
  accountingHubLabel,
  demoLabel,
  demoHref,
}: {
  locale: AppLocale;
  business: ContactLinks;
  serviceGroups: MobileServiceGroup[];
  offeringMenus: MobileOfferingMenu[];
  softwareLinks: MobileSoftwareLink[];
  logInLabel: string;
  accountingHubLabel: string;
  demoLabel: string;
  /** /kontakt with the demo topic preselected (lib/contact-links). */
  demoHref: string;
}) {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            aria-label={t("openMenu")}
            className="lg:hidden"
          />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent
        side={isRtlLocale(locale) ? "left" : "right"}
        className="flex w-[85vw] max-w-sm flex-col"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Image
              src="/media/optimized/logo-horizontal.webp"
              alt={brand.brandName}
              width={180}
              height={75}
              className="h-8 w-auto"
            />
            <span className="sr-only">{t("menuLabel")}</span>
          </SheetTitle>
        </SheetHeader>
        <nav
          aria-label={t("menuLabel")}
          className="flex flex-1 flex-col gap-1 overflow-y-auto px-3"
        >
          {primaryNav
            .filter((link) => link.routeKey === "/")
            .map((link) => (
              <NavLink
                key={link.routeKey}
                href={link.routeKey as StaticAppPathname}
                onClick={() => setOpen(false)}
                className={ROW_CLASS}
              >
                <NavRowIcon icon={navIcons[link.routeKey] ?? Home} />
                {getLocalized(link.label, locale)}
                <RowChevron />
              </NavLink>
            ))}
          <Accordion>
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="hover:bg-muted/70 aria-expanded:bg-muted/50 items-center rounded-xl py-[7px] ps-[7px] pe-3 text-base font-medium hover:no-underline">
                <span className="flex items-center gap-3">
                  <NavRowIcon icon={Layers} />
                  {t("services")}
                </span>
              </AccordionTrigger>
              <AccordionContent className="[&_a]:no-underline">
                <div className="border-border/70 ms-6 mt-1 flex flex-col gap-4 border-s ps-4">
                  <Link
                    href="/tjanster"
                    onClick={() => setOpen(false)}
                    className="text-primary hover:bg-accent -mx-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold"
                  >
                    {accountingHubLabel}
                    <ChevronRight
                      size={15}
                      aria-hidden="true"
                      className="rtl:rotate-180"
                    />
                  </Link>
                  {serviceGroups.map(({ group, label, services }) => (
                    <div key={group}>
                      <p className="text-muted-foreground pb-1 text-xs font-semibold tracking-wide uppercase">
                        {label}
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {services.map((service) => {
                          const Icon = getServiceIcon(service.key);
                          return (
                            <li key={service.key}>
                              <Link
                                href={service.href}
                                onClick={() => setOpen(false)}
                                className="hover:bg-accent hover:text-accent-foreground -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors"
                              >
                                <Icon
                                  size={16}
                                  aria-hidden="true"
                                  className="text-primary shrink-0"
                                />
                                {service.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            {offeringMenus.map((menu) => (
              <AccordionItem
                key={menu.key}
                value={menu.key}
                className="border-none"
              >
                <AccordionTrigger className="hover:bg-muted/70 aria-expanded:bg-muted/50 items-center rounded-xl py-[7px] ps-[7px] pe-3 text-base font-medium hover:no-underline">
                  <span className="flex items-center gap-3">
                    <NavRowIcon icon={offeringIcons[menu.key]} />
                    {menu.label}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="[&_a]:no-underline">
                  <ul className="border-border/70 ms-6 mt-1 flex flex-col gap-0.5 border-s ps-4">
                    <li>
                      <Link
                        href={menu.hubRoute}
                        onClick={() => setOpen(false)}
                        className="text-primary hover:bg-accent -mx-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold"
                      >
                        {menu.hubLabel}
                        <ChevronRight
                          size={15}
                          aria-hidden="true"
                          className="rtl:rotate-180"
                        />
                      </Link>
                    </li>
                    {menu.services.map((service) => {
                      const Icon = getServiceIcon(service.key);
                      return (
                        <li key={service.key}>
                          <Link
                            href={service.href}
                            onClick={() => setOpen(false)}
                            className="hover:bg-accent hover:text-accent-foreground -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors"
                          >
                            <Icon
                              size={16}
                              aria-hidden="true"
                              className="text-primary shrink-0"
                            />
                            {service.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
            <AccordionItem value="software" className="border-none">
              <AccordionTrigger className="hover:bg-muted/70 aria-expanded:bg-muted/50 items-center rounded-xl py-[7px] ps-[7px] pe-3 text-base font-medium hover:no-underline">
                <span className="flex items-center gap-3">
                  <NavRowIcon icon={Calculator} />
                  {getLocalized(
                    primaryNav.find((l) => l.routeKey === "/bokforingsprogram")!
                      .label,
                    locale,
                  )}
                </span>
              </AccordionTrigger>
              <AccordionContent className="[&_a]:no-underline">
                <ul className="border-border/70 ms-6 mt-1 flex flex-col gap-0.5 border-s ps-4">
                  {softwareLinks.map((link) => (
                    <li key={link.routeKey}>
                      <Link
                        href={link.routeKey}
                        onClick={() => setOpen(false)}
                        className="hover:bg-accent hover:text-accent-foreground -mx-2 flex flex-col rounded-lg px-2 py-2 text-sm transition-colors"
                      >
                        <span className="font-medium">{link.label}</span>
                        <span className="text-muted-foreground text-xs">
                          {link.summary}
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <a
                      href={demoHref}
                      onClick={() => setOpen(false)}
                      data-cta="mobile-nav-book-demo"
                      className="text-primary hover:bg-accent -mx-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold"
                    >
                      {demoLabel}
                      <ChevronRight
                        size={15}
                        aria-hidden="true"
                        className="rtl:rotate-180"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href={APP_LOGIN_URL}
                      rel="noopener"
                      className="text-primary hover:bg-accent -mx-2 flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold"
                    >
                      <LogIn
                        size={16}
                        aria-hidden="true"
                        className="rtl:-scale-x-100"
                      />
                      {logInLabel}
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {primaryNav
            .filter(
              (link) =>
                link.routeKey !== "/" &&
                link.routeKey !== "/tjanster" &&
                link.routeKey !== "/digital-marknadsforing" &&
                link.routeKey !== "/systemutveckling" &&
                link.routeKey !== "/bokforingsprogram",
            )
            .map((link) => (
              <NavLink
                key={link.routeKey}
                href={link.routeKey as StaticAppPathname}
                onClick={() => setOpen(false)}
                className={ROW_CLASS}
              >
                <NavRowIcon icon={navIcons[link.routeKey] ?? Mail} />
                {getLocalized(link.label, locale)}
                <RowChevron />
              </NavLink>
            ))}
        </nav>
        <div
          data-track-location="menu"
          className="border-border mt-auto flex flex-col gap-3 border-t p-4"
        >
          <div className="flex gap-2">
            <Button
              render={<a href={business.phoneHref} />}
              className="flex-1 gap-2"
            >
              <Phone size={16} aria-hidden="true" />
              {common("callUs")}
            </Button>
            {business.whatsappHref ? (
              <Button
                render={
                  <a
                    href={business.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                variant="whatsapp"
                className="flex-1 gap-2"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </Button>
            ) : null}
          </div>
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
