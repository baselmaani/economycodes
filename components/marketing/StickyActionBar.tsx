import { MessageCircle, Phone, Send } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import type { ContactLinks } from "@/content/types";

/** Mobile-only bottom bar with Call / WhatsApp / Contact. Server-rendered: no client JS. */
export async function StickyActionBar({
  business,
}: {
  business: ContactLinks;
}) {
  const t = await getTranslations("common");

  return (
    <div className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-40 flex border-t pb-[env(safe-area-inset-bottom)] backdrop-blur-sm lg:hidden">
      <a
        href={business.phoneHref}
        className="text-foreground active:bg-muted flex flex-1 flex-col items-center gap-0.5 py-2.5 text-xs font-medium"
      >
        <Phone size={18} aria-hidden="true" />
        {t("callUs")}
      </a>
      {business.whatsappHref ? (
        <a
          href={business.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border text-foreground active:bg-muted flex flex-1 flex-col items-center gap-0.5 border-s py-2.5 text-xs font-medium"
        >
          {/* Brand green only on the icon: as text it fails contrast on white. */}
          <MessageCircle
            size={18}
            aria-hidden="true"
            className="text-whatsapp"
          />
          {t("whatsapp")}
        </a>
      ) : null}
      <Link
        href="/kontakt"
        className="border-border bg-primary text-primary-foreground active:bg-primary/90 flex flex-1 flex-col items-center gap-0.5 border-s py-2.5 text-xs font-medium"
      >
        <Send size={18} aria-hidden="true" />
        {t("contactUs")}
      </Link>
    </div>
  );
}
