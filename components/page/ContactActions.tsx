import NextLink from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";
import { business } from "@/content/business";
import { buttonVariants } from "@/components/ui/button";

/**
 * Primary call to action plus phone and WhatsApp, the row every offering
 * page uses. The primary action is a real link styled as a button.
 */
export function ContactActions({
  href,
  label,
  tone = "light",
  showWhatsApp = true,
  ctaId,
  className,
}: {
  /** Usually getInquiryHref()/getContactHref() from lib/contact-links. */
  href: string;
  label: string;
  /** "dark" on gradient/navy backgrounds. */
  tone?: "light" | "dark";
  showWhatsApp?: boolean;
  /** data-cta value, for click tracking. */
  ctaId?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  const secondaryLink = cn(
    "inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-medium transition-colors focus-visible:ring-3 focus-visible:outline-none",
    dark
      ? "text-white/85 hover:text-white focus-visible:ring-white/60"
      : "text-muted-foreground hover:text-primary focus-visible:ring-ring/50",
  );
  const iconClass = dark ? "text-white" : "text-primary";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-2",
        dark && "justify-center",
        className,
      )}
    >
      <NextLink
        href={href}
        className={buttonVariants({
          variant: dark ? "secondary" : "shine",
          size: "lg",
          className: "gap-2",
        })}
        data-cta={ctaId}
      >
        {label}
        <ArrowRight size={18} aria-hidden="true" className="rtl:rotate-180" />
      </NextLink>
      <a href={business.phoneHref} className={secondaryLink}>
        <Phone size={16} className={iconClass} aria-hidden="true" />
        <span dir="ltr">{business.phone}</span>
      </a>
      {showWhatsApp && business.whatsappHref ? (
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={secondaryLink}
        >
          <MessageCircle size={16} className={iconClass} aria-hidden="true" />
          WhatsApp
        </a>
      ) : null}
    </div>
  );
}
