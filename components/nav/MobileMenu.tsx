"use client";

import { useState } from "react";
import { Menu, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { AppLocale, StaticAppPathname } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getServiceSlug } from "@/lib/routes";
import { servicesList } from "@/content/services";
import {
  getServiceGroup,
  serviceGroups,
  type ServiceGroup,
} from "@/content/service-icons";
import { business } from "@/content/business";
import { primaryNav } from "@/content/nav";
import { Button } from "@/components/ui/button";
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
          <SheetTitle>{t("menuLabel")}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4">
          <Accordion>
            <AccordionItem value="services" className="border-none">
              <AccordionTrigger className="py-3 text-base font-medium">
                {t("services")}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4 ps-2">
                  {grouped.map(({ group, label, services }) => (
                    <div key={group}>
                      <p className="text-muted-foreground pb-1 text-xs font-semibold tracking-wide uppercase">
                        {label}
                      </p>
                      <ul className="flex flex-col gap-1">
                        {services.map((service) => (
                          <li key={service.key}>
                            <Link
                              href={{
                                pathname: "/tjanster/[slug]",
                                params: {
                                  slug: getServiceSlug(locale, service),
                                },
                              }}
                              onClick={() => setOpen(false)}
                              className="hover:text-primary block py-2 text-sm"
                            >
                              {getLocalized(service.name, locale)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {primaryNav
            .filter((link) => link.routeKey !== "/tjanster")
            .map((link) => (
              <Link
                key={link.routeKey}
                href={link.routeKey as StaticAppPathname}
                onClick={() => setOpen(false)}
                className="hover:text-primary border-border/60 border-b py-3 text-base font-medium"
              >
                {getLocalized(link.label, locale)}
              </Link>
            ))}
        </nav>
        <div className="border-border mt-auto border-t p-4">
          <Button
            render={<a href={business.phoneHref} />}
            className="w-full gap-2"
          >
            <Phone size={16} aria-hidden="true" />
            {common("callUs")}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
