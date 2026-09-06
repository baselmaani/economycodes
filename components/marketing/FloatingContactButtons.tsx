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
    <div className="fixed bottom-6 end-6 z-40 hidden flex-col gap-3 lg:flex">
      {business.whatsappHref ? (
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          title="WhatsApp"
          aria-label="WhatsApp"
          className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20bd5a]"
        >
          <WhatsAppIcon size={28} />
        </a>
      ) : null}
      <a
        href={business.phoneHref}
        title={t("callUs")}
        aria-label={t("callUs")}
        className="bg-primary text-primary-foreground flex size-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
      >
        <Phone size={26} aria-hidden="true" />
      </a>
    </div>
  );
}
