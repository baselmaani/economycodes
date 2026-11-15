"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export interface PrefillTopic {
  /** ?amne= value. */
  query: string;
  /** Option value to select. */
  value: string;
  /** Starter text for an empty message field. */
  message: string;
}

/**
 * Preselects the topic a visitor came for (/kontakt?amne=...): a general
 * topic from content/inquiries.ts (which also starts the message), or a
 * single service key. The form itself stays server-rendered and
 * uncontrolled; this only fills in empty fields once, inside its own
 * Suspense boundary so the page can still be prerendered.
 */
export function ContactInquiryPrefill({ topics }: { topics: PrefillTopic[] }) {
  const searchParams = useSearchParams();
  const amne = searchParams.get("amne");

  useEffect(() => {
    if (!amne) return;
    const topic = topics.find((entry) => entry.query === amne);
    const value = topic?.value ?? amne;
    const select = document.querySelector<HTMLSelectElement>(
      'select[name="service"]',
    );
    const hasOption = Array.from(select?.options ?? []).some(
      (option) => option.value === value,
    );
    if (!select || !hasOption) return;
    if (!select.value) select.value = value;
    const textarea = document.querySelector<HTMLTextAreaElement>(
      'textarea[name="message"]',
    );
    if (topic && textarea && !textarea.value) textarea.value = topic.message;
  }, [amne, topics]);

  return null;
}
