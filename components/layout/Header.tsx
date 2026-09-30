import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

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
import { Container } from "@/components/layout/Container";
import { HeaderScrollShell } from "@/components/layout/HeaderScrollShell";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from "@/components/nav/LanguageSwitcher";
import { MobileMenu } from "@/components/nav/MobileMenu";
import { NavLink } from "@/components/nav/NavLink";

const GROUP_ORDER: ServiceGroup[] = ["core", "advisory", "specialist"];

export async function Header({ locale }: { locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    label: serviceGroups[group][locale],
    services: servicesList.filter((s) => getServiceGroup(s.key) === group),
  })).filter((g) => g.services.length > 0);

  return (
    <HeaderScrollShell>
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/media/optimized/logo-horizontal.webp"
              alt={business.brandName}
              width={180}
              height={75}
              loading="eager"
              className="h-9 w-auto lg:h-10"
            />
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {primaryNav
                .filter((l) => l.routeKey === "/")
                .map((link) => (
                  <NavigationMenuItem key={link.routeKey}>
                    <NavigationMenuLink
                      render={
                        <NavLink
                          href={link.routeKey as StaticAppPathname}
                          className="data-[active]:bg-secondary data-[active]:text-secondary-foreground px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground data-[active]:font-semibold"
                        />
                      }
                    >
                      {getLocalized(link.label, locale)}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {getLocalized(
                    primaryNav.find((l) => l.routeKey === "/tjanster")!.label,
                    locale,
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[700px]">
                    <div className="border-border/70 flex items-center justify-between border-b px-5 py-3">
                      <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        {tHome("servicesEyebrow")}
                      </span>
                      <NavigationMenuLink
                        render={
                          <Link
                            href="/tjanster"
                            className="text-primary group/all-services inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold"
                          />
                        }
                      >
                        {tHome("heroCtaServices")}
                        <ArrowRight
                          size={13}
                          aria-hidden="true"
                          className="rtl:rotate-180 transition-transform group-hover/all-services:translate-x-0.5 rtl:group-hover/all-services:-translate-x-0.5"
                        />
                      </NavigationMenuLink>
                    </div>
                    <div className="divide-border/70 grid grid-cols-3 divide-x p-2">
                      {grouped.map(({ group, label, services }) => (
                        <div
                          key={group}
                          className="flex flex-col gap-0.5 px-2.5 py-2"
                        >
                          <span className="text-muted-foreground px-2 pt-1 pb-2 text-xs font-semibold tracking-wide uppercase">
                            {label}
                          </span>
                          {services.map((service) => {
                            const Icon = getServiceIcon(service.key);
                            return (
                              <NavigationMenuLink
                                key={service.key}
                                render={
                                  <Link
                                    href={{
                                      pathname: "/tjanster/[slug]",
                                      params: {
                                        slug: getServiceSlug(locale, service),
                                      },
                                    }}
                                    className="hover:bg-accent hover:text-accent-foreground group/service-link flex items-start gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors"
                                  />
                                }
                              >
                                <span className="bg-secondary text-primary group-hover/service-link:bg-primary group-hover/service-link:text-primary-foreground mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md shadow-sm transition-colors group-hover/service-link:shadow">
                                  <Icon size={15} aria-hidden="true" />
                                </span>
                                <span className="pt-1">
                                  {getLocalized(service.name, locale)}
                                </span>
                              </NavigationMenuLink>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {primaryNav
                .filter((l) => l.routeKey !== "/" && l.routeKey !== "/tjanster")
                .map((link) => (
                  <NavigationMenuItem key={link.routeKey}>
                    <NavigationMenuLink
                      render={
                        <NavLink
                          href={link.routeKey as StaticAppPathname}
                          className="data-[active]:bg-secondary data-[active]:text-secondary-foreground px-4 py-2.5 text-sm font-medium text-foreground/80 hover:text-foreground data-[active]:font-semibold"
                        />
                      }
                    >
                      {getLocalized(link.label, locale)}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button
              render={<Link href="/kontakt" />}
              size="default"
              className="hidden sm:inline-flex"
            >
              {t("contactUs")}
            </Button>
            <MobileMenu locale={locale} />
          </div>
        </div>
      </Container>
    </HeaderScrollShell>
  );
}
