"use client";

import { MessageCircle, Phone, Send } from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { business } from "@/content/business";

export function StickyActionBar() {
  const t = useTranslations("common");

  return (
    <div className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-40 flex border-t backdrop-blur-sm lg:hidden">
      <a
        href={business.phoneHref}
        className="text-foreground flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium"
      >
        <Phone size={18} aria-hidden="true" />
        {t("callUs")}
      </a>
      {business.whatsappHref ? (
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border text-foreground flex flex-1 flex-col items-center gap-0.5 border-s py-2.5 text-xs font-medium"
        >
          <MessageCircle size={18} aria-hidden="true" />
          WhatsApp
        </a>
      ) : null}
      <Link
        href="/kontakt"
        className="border-border bg-primary text-primary-foreground flex flex-1 flex-col items-center gap-0.5 border-s py-2.5 text-xs font-medium"
      >
        <Send size={18} aria-hidden="true" />
        {t("contactUs")}
      </Link>
    </div>
  );
}
