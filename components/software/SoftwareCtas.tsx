import NextLink from "next/link";
import { ArrowDown, ArrowRight, LogIn } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getInquiryHref } from "@/lib/contact-links";
import { getLocalized } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";
import { APP_LOGIN_URL } from "@/content/software";
import { softwareCommon } from "@/content/software-pages";
import { buttonVariants } from "@/components/ui/button";

export function SoftwareCtas({
  locale,
  featuresAnchor,
  tone = "light",
  className,
}: {
  locale: AppLocale;
  /** In-page id for "Se funktioner"; omitted where there's no feature overview. */
  featuresAnchor?: string;
  /** "dark" on the gradient CTA band. */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-3 gap-y-3",
        tone === "dark" && "justify-center",
        className,
      )}
    >
      {/* Real links styled as buttons: Base UI's Button would give them role="button". */}
      <NextLink
        href={getInquiryHref(locale, "demo")}
        className={buttonVariants({
          variant: tone === "dark" ? "secondary" : "shine",
          size: "lg",
          className: "gap-2",
        })}
        data-cta="book-demo"
      >
        {getLocalized(softwareCommon.bookDemo, locale)}
        <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
      </NextLink>
      {featuresAnchor ? (
        <a
          href={`#${featuresAnchor}`}
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "gap-2",
          })}
        >
          {getLocalized(softwareCommon.seeFeatures, locale)}
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      ) : null}
      <a
        href={APP_LOGIN_URL}
        rel="noopener"
        className={buttonVariants({
          variant: tone === "dark" ? "outline" : "ghost",
          size: "lg",
          className: cn(
            "gap-2",
            tone === "dark" &&
              "border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white",
          ),
        })}
        data-cta="log-in"
      >
        <LogIn size={18} aria-hidden="true" className="rtl:-scale-x-100" />
        {getLocalized(softwareCommon.logIn, locale)}
      </a>
    </div>
  );
}
