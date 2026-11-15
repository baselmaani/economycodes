import Image from "next/image";
import { ArrowRight, LogIn } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { AppLocale, StaticAppPathname } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { getOfferingServices, getServiceHref } from "@/lib/service-lookup";
import { getInquiryHref } from "@/lib/contact-links";
import { servicesList } from "@/content/services";
import {
  ACCOUNTING_GROUPS,
  getServiceIcon,
  groupServices,
} from "@/content/service-icons";
import { business } from "@/content/business";
import { primaryNav } from "@/content/nav";
import { offerings } from "@/content/offerings";
import { APP_LOGIN_URL, liveSoftwarePages } from "@/content/software";
import { softwareCommon } from "@/content/software-pages";
import { getBusiness } from "@/lib/cms/site";
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
import {
  MobileMenu,
  type MobileOfferingMenu,
  type MobileServiceGroup,
  type MobileSoftwareLink,
} from "@/components/nav/MobileMenu";
import { NavLink } from "@/components/nav/NavLink";

const TRIGGER_CLASS =
  "text-foreground/75 hover:text-foreground hover:bg-background/80 focus:bg-background/80 data-open:bg-background data-open:text-primary data-open:hover:bg-background data-open:focus:bg-background data-popup-open:bg-background data-popup-open:text-primary data-popup-open:hover:bg-background h-9 rounded-full px-3 xl:px-4 data-open:shadow-sm data-popup-open:shadow-sm";

/** Primary nav items that get their own dropdown instead of a plain link. */
const DROPDOWN_ROUTES = new Set([
  "/tjanster",
  "/digital-marknadsforing",
  "/systemutveckling",
  "/bokforingsprogram",
]);

// Pill items inside a tinted track; the active page lifts out as a white chip.
// Tighter padding below xl so the four offerings fit at 1024px.
const DESKTOP_LINK_CLASS =
  "text-foreground/75 hover:text-foreground focus:text-foreground hover:bg-background/80 focus:bg-background/80 data-[active]:bg-background data-[active]:text-primary h-9 rounded-full px-3 py-0 text-sm whitespace-nowrap xl:px-4 font-medium data-[active]:font-semibold data-[active]:shadow-sm";

export async function Header({ locale }: { locale: AppLocale }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const tHome = await getTranslations({ locale, namespace: "home" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const grouped = groupServices(servicesList, ACCOUNTING_GROUPS, locale);
  // Only names and slugs cross into the client bundle, not the full
  // content/services.ts (every service's copy in three languages).
  const mobileGroups: MobileServiceGroup[] = grouped.map(
    ({ group, label, services }) => ({
      group,
      label,
      services: services.map((service) => ({
        key: service.key,
        name: getLocalized(service.name, locale),
        href: getServiceHref(locale, service),
      })),
    }),
  );

  // Marketing and development: one flat dropdown of services each, with a
  // link to the offering's hub.
  const flatMenus = (
    [
      ["marknadsforing", tHome("digitalCta")],
      ["utveckling", tNav("allDevelopment")],
    ] as const
  ).map(([key, hubLabel]) => ({
    key,
    label: getLocalized(offerings[key].navLabel, locale),
    whoDoesIt: getLocalized(offerings[key].whoDoesIt, locale),
    hubRoute: offerings[key].route,
    hubLabel,
    services: getOfferingServices(key),
  }));
  const mobileOfferings: MobileOfferingMenu[] = flatMenus.map((menu) => ({
    key: menu.key,
    label: menu.label,
    hubRoute: menu.hubRoute,
    hubLabel: menu.hubLabel,
    services: menu.services.map((service) => ({
      key: service.key,
      name: getLocalized(service.name, locale),
      href: getServiceHref(locale, service),
    })),
  }));
  const accountingLabel = getLocalized(offerings.redovisning.navLabel, locale);

  const softwareLinks: MobileSoftwareLink[] = liveSoftwarePages().map(
    (page) => ({
      routeKey: page.route,
      label: getLocalized(page.navLabel, locale),
      summary: getLocalized(page.summary, locale),
    }),
  );
  const softwareLabel = getLocalized(
    offerings.bokforingsprogram.navLabel,
    locale,
  );
  const logInLabel = getLocalized(softwareCommon.logIn, locale);
  const demoLabel = getLocalized(softwareCommon.bookDemo, locale);
  const demoHref = getInquiryHref(locale, "demo");

  return (
    <HeaderScrollShell>
      <Container>
        <div className="flex h-16 items-center justify-between gap-3 lg:h-20 xl:gap-4">
          <Link
            href="/"
            className="focus-visible:ring-ring/50 flex shrink-0 items-center gap-2 rounded-md transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:outline-none"
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

          {/* "Hem" is left out on desktop: the logo links to the homepage. */}
          <NavigationMenu
            className="hidden lg:flex"
            aria-label={tNav("menuLabel")}
          >
            <NavigationMenuList className="bg-secondary/70 ring-border/60 gap-0.5 rounded-full p-1 ring-1">
              <NavigationMenuItem>
                <NavigationMenuTrigger className={TRIGGER_CLASS}>
                  {accountingLabel}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[700px]">
                    <div className="border-border/70 flex items-center justify-between border-b px-5 py-3">
                      <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                        {getLocalized(offerings.redovisning.whoDoesIt, locale)}
                      </span>
                      <NavigationMenuLink
                        render={
                          <Link
                            href="/tjanster"
                            className="text-primary group/all-services inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold"
                          />
                        }
                      >
                        {tNav("allAccounting")}
                        <ArrowRight
                          size={13}
                          aria-hidden="true"
                          className="transition-transform group-hover/all-services:translate-x-0.5 rtl:rotate-180 rtl:group-hover/all-services:-translate-x-0.5"
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
                                    href={getServiceHref(locale, service)}
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
              {flatMenus.map((menu) => (
                <NavigationMenuItem key={menu.key}>
                  <NavigationMenuTrigger className={TRIGGER_CLASS}>
                    {menu.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[560px]">
                      <div className="border-border/70 flex items-center justify-between border-b px-5 py-3">
                        <span className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
                          {menu.whoDoesIt}
                        </span>
                        <NavigationMenuLink
                          render={
                            <Link
                              href={menu.hubRoute}
                              className="text-primary group/all-offering inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold"
                            />
                          }
                        >
                          {menu.hubLabel}
                          <ArrowRight
                            size={13}
                            aria-hidden="true"
                            className="transition-transform group-hover/all-offering:translate-x-0.5 rtl:rotate-180 rtl:group-hover/all-offering:-translate-x-0.5"
                          />
                        </NavigationMenuLink>
                      </div>
                      <div className="grid grid-cols-2 gap-0.5 p-3">
                        {menu.services.map((service) => {
                          const Icon = getServiceIcon(service.key);
                          return (
                            <NavigationMenuLink
                              key={service.key}
                              render={
                                <Link
                                  href={getServiceHref(locale, service)}
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
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={TRIGGER_CLASS}>
                  {softwareLabel}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[420px] p-2">
                    <ul className="flex flex-col gap-0.5">
                      {softwareLinks.map((link) => (
                        <li key={link.routeKey}>
                          <NavigationMenuLink
                            render={
                              <Link
                                href={link.routeKey}
                                className="hover:bg-accent hover:text-accent-foreground flex flex-col gap-0.5 rounded-lg px-3 py-2.5 transition-colors"
                              />
                            }
                          >
                            <span className="text-sm font-semibold">
                              {link.label}
                            </span>
                            <span className="text-muted-foreground text-xs">
                              {link.summary}
                            </span>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                    <div className="border-border/70 mt-1 flex items-center justify-between gap-2 border-t px-1 pt-2">
                      <NavigationMenuLink
                        render={
                          <a
                            href={demoHref}
                            data-cta="nav-book-demo"
                            className="bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 hover:text-primary-foreground focus:text-primary-foreground inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold"
                          />
                        }
                      >
                        {demoLabel}
                        <ArrowRight
                          size={15}
                          aria-hidden="true"
                          className="rtl:rotate-180"
                        />
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        render={
                          <a
                            href={APP_LOGIN_URL}
                            rel="noopener"
                            className="text-primary hover:bg-accent inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold"
                          />
                        }
                      >
                        <LogIn
                          size={15}
                          aria-hidden="true"
                          className="rtl:-scale-x-100"
                        />
                        {logInLabel}
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Kontakt is left out: the "Kontakta oss" button beside the nav covers it. */}
              {primaryNav
                .filter(
                  (l) =>
                    l.routeKey !== "/" &&
                    !DROPDOWN_ROUTES.has(l.routeKey) &&
                    l.routeKey !== "/kontakt",
                )
                .map((link) => (
                  // Plain links (Om Hadi) only from xl: below that the four
                  // offering dropdowns take the room; the footer links them.
                  <NavigationMenuItem
                    key={link.routeKey}
                    className="hidden xl:block"
                  >
                    <NavigationMenuLink
                      className={DESKTOP_LINK_CLASS}
                      render={
                        <NavLink href={link.routeKey as StaticAppPathname} />
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
            <MobileMenu
              locale={locale}
              business={await getBusiness()}
              serviceGroups={mobileGroups}
              offeringMenus={mobileOfferings}
              softwareLinks={softwareLinks}
              logInLabel={logInLabel}
              accountingHubLabel={tNav("allAccounting")}
              demoLabel={demoLabel}
              demoHref={demoHref}
            />
          </div>
        </div>
      </Container>
    </HeaderScrollShell>
  );
}
