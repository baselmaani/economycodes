"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Home,
  Layers,
  Mail,
  Menu,
  MessageCircle,
  Newspaper,
  Phone,
  TrendingUp,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { AppLocale, StaticAppPathname } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceSlug } from "@/lib/routes";
import { servicesList } from "@/content/services";
import {
  getServiceGroup,
  getServiceIcon,
  serviceGroups,
  type ServiceGroup,
} from "@/content/service-icons";
import { business } from "@/content/business";
import { primaryNav } from "@/content/nav";
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
  "/artiklar": Newspaper,
  "/kontakt": Mail,
};

function NavRowIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="bg-secondary text-primary group-data-[active]:bg-primary group-data-[active]:text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors">
      <Icon size={16} aria-hidden="true" />
    </span>
  );
}

export function MobileMenu({ locale }: { locale: AppLocale }) {
  const t = useTranslations("nav");
  const common = useTranslations("common");
  const [open, setOpen] = useState(false);

  const groupOrder: ServiceGroup[] = ["core", "advisory", "specialist"];
  const grouped = groupOrder
    .map((group) => ({
      group,
      label: serviceGroups[group][locale],
      services: servicesList.filter((s) => getServiceGroup(s.key) === group),
    }))
    .filter((g) => g.services.length > 0);

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
      <SheetContent side="right" className="flex w-[85vw] max-w-sm flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Image
              src="/media/optimized/logo-horizontal.webp"
              alt={business.brandName}
              width={180}
              height={75}
              className="h-8 w-auto"
            />
            <span className="sr-only">{t("menuLabel")}</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
          {primaryNav
            .filter((link) => link.routeKey === "/")
            .map((link) => (
              <NavLink
                key={link.routeKey}
                href={link.routeKey as StaticAppPathname}
                onClick={() => setOpen(false)}
                className="group border-border/60 data-[active]:bg-secondary data-[active]:text-secondary-foreground data-[active]:border-transparent hover:bg-muted/60 -mx-2 flex items-center gap-3 border-b px-2 py-2.5 text-base font-medium data-[active]:font-semibold data-[active]:rounded-lg"
              >
                <NavRowIcon icon={navIcons[link.routeKey] ?? Home} />
                {getLocalized(link.label, locale)}
              </NavLink>
            ))}
          <Accordion>
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="border-border/60 hover:bg-muted/60 hover:no-underline -mx-2 items-center border-b px-2 py-2.5 text-base font-medium">
                <span className="flex items-center gap-3">
                  <NavRowIcon icon={Layers} />
                  {t("services")}
                </span>
              </AccordionTrigger>
              <AccordionContent className="[&_a]:no-underline">
                <div className="flex flex-col gap-4 ps-2">
                  {grouped.map(({ group, label, services }) => (
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
                                href={{
                                  pathname: "/tjanster/[slug]",
                                  params: {
                                    slug: getServiceSlug(locale, service),
                                  },
                                }}
                                onClick={() => setOpen(false)}
                                className="hover:bg-accent hover:text-accent-foreground -mx-2 flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors"
                              >
                                <Icon
                                  size={16}
                                  aria-hidden="true"
                                  className="text-primary shrink-0"
                                />
                                {getLocalized(service.name, locale)}
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
          </Accordion>
          {primaryNav
            .filter(
              (link) => link.routeKey !== "/" && link.routeKey !== "/tjanster",
            )
            .map((link) => (
              <NavLink
                key={link.routeKey}
                href={link.routeKey as StaticAppPathname}
                onClick={() => setOpen(false)}
                className="group border-border/60 data-[active]:bg-secondary data-[active]:text-secondary-foreground data-[active]:border-transparent hover:bg-muted/60 -mx-2 flex items-center gap-3 border-b px-2 py-2.5 text-base font-medium data-[active]:font-semibold data-[active]:rounded-lg"
              >
                <NavRowIcon icon={navIcons[link.routeKey] ?? Mail} />
                {getLocalized(link.label, locale)}
              </NavLink>
            ))}
        </nav>
        <div className="border-border mt-auto flex flex-col gap-3 border-t p-4">
          <div className="flex gap-2">
            <Button
              render={<a href={business.phoneHref} />}
              className="flex-1 gap-2"
            >
              <Phone size={16} aria-hidden="true" />
              {common("callUs")}
            </Button>
            <Button
              render={<a href={business.whatsappHref} />}
              variant="whatsapp"
              className="flex-1 gap-2"
            >
              <MessageCircle size={16} aria-hidden="true" />
              WhatsApp
            </Button>
          </div>
          <LanguageSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
}
