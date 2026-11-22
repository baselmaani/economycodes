"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  OPEN_CONSENT_EVENT,
  readConsent,
  storeConsent,
  updateConsent,
  type ConsentChoice,
} from "@/lib/analytics";

/**
 * Analytics consent banner (Google Consent Mode v2). GTM loads with every
 * storage type denied; GA only sets cookies after "Accept". Accept and
 * Decline have the same size and placement, as IMY expects. Reopened from
 * the Footer's "Cookie settings" button.
 */
export function CookieConsent() {
  const t = useTranslations("consent");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Read after mount: localStorage isn't available during prerendering.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from storage
    if (readConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  function choose(choice: ConsentChoice) {
    const previous = readConsent();
    storeConsent(choice);
    updateConsent(choice, previous);
    setOpen(false);
  }

  return (
    <section
      role="region"
      aria-label={t("title")}
      className="border-border bg-background text-foreground fixed inset-x-3 bottom-[calc(4.25rem+env(safe-area-inset-bottom))] z-50 rounded-2xl border p-4 shadow-xl sm:p-5 lg:inset-x-auto lg:start-6 lg:bottom-6 lg:max-w-md"
    >
      <h2 className="text-base font-semibold">{t("title")}</h2>
      <p className="text-muted-foreground mt-1.5 text-sm">
        {t("body")}{" "}
        <Link
          href="/cookies"
          className="text-primary font-medium underline underline-offset-4"
        >
          {t("readMore")}
        </Link>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => choose("denied")}>
          {t("decline")}
        </Button>
        <Button onClick={() => choose("granted")}>{t("accept")}</Button>
      </div>
    </section>
  );
}
