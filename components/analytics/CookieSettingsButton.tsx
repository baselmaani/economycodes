"use client";

import { OPEN_CONSENT_EVENT } from "@/lib/analytics";

/** Reopens the consent banner, so a visitor can change or withdraw consent. */
export function CookieSettingsButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
