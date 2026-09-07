import Image from "next/image";
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

  const grouped = GROUP_ORDER.map((group) => ({
    group,
    label: serviceGroups[group][locale],
    services: servicesList.filter((s) => getServiceGroup(s.key) === group),
  })).filter((g) => g.services.length > 0);

  return (
    <HeaderScrollShell>
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/media/optimized/logo-horizontal.webp"
              alt={business.brandName}
              width={180}
              height={75}
              loading="eager"
              fetchPriority="high"
              className="h-9 w-auto lg:h-10"
            />
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {getLocalized(
                    primaryNav.find((l) => l.routeKey === "/tjanster")!.label,
                    locale,
                  )}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[640px] grid-cols-3 gap-1 p-3">
                    {grouped.map(({ group, label, services }) => (
                      <div key={group} className="flex flex-col gap-1">
                        <span className="text-muted-foreground px-3 pt-1 pb-2 text-xs font-semibold tracking-wide uppercase">
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
                                  className="hover:bg-accent hover:text-accent-foreground flex items-start gap-2 rounded-md px-3 py-2 text-sm transition-colors"
                                />
                              }
                            >
                              <Icon
                                size={16}
                                aria-hidden="true"
                                className="text-primary mt-0.5 shrink-0"
                              />
                              <span>{getLocalized(service.name, locale)}</span>
                            </NavigationMenuLink>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {primaryNav
                .filter((l) => l.routeKey !== "/tjanster")
                .map((link) => (
                  <NavigationMenuItem key={link.routeKey}>
                    <NavigationMenuLink
                      render={
                        <NavLink
                          href={link.routeKey as StaticAppPathname}
                          className="px-4 py-2.5 text-sm font-medium"
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
