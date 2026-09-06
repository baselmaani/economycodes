"use client";

import { Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { business } from "@/content/business";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

/**
 * Desktop-only floating Call/WhatsApp buttons. Mobile already gets the same
 * actions from StickyActionBar (fixed bottom bar, lg:hidden) -- showing both
 * at once would duplicate the UI, so this is hidden below lg.
 */
export function FloatingContactButtons() {
  const t = useTranslations("common");

  return (
    <div className="fixed end-6 bottom-6 z-40 hidden flex-col gap-3 lg:flex">
      <a
        href={business.phoneHref}
        title={t("callUs")}
        aria-label={t("callUs")}
        className="bg-primary text-primary-foreground hover:bg-primary/90 flex size-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 ease-(--ease-standard) hover:-translate-y-0.5"
      >
        <Phone size={26} aria-hidden="true" />
      </a>
      {business.whatsappHref ? (
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          aria-label="WhatsApp"
          className="bg-whatsapp flex size-14 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-200 ease-(--ease-standard) hover:-translate-y-0.5 hover:brightness-95"
        >
          <WhatsAppIcon size={28} />
        </a>
      ) : null}
    </div>
  );
}
