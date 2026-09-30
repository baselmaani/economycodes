"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import type { Faq } from "@/content/types";

export function FaqAccordion({
  faqs,
  locale,
}: {
  faqs: Faq[];
  locale: AppLocale;
}) {
  if (faqs.length === 0) return null;

  return (
    // hiddenUntilFound keeps every closed answer in the server-rendered HTML
    // (as hidden="until-found") instead of unmounting it: crawlers and AI
    // answer engines that don't run JS can read the answers the FAQPage
    // JSON-LD describes, and the browser's find-in-page can open them.
    <Accordion
      hiddenUntilFound
      className="border-border w-full divide-y rounded-2xl border"
    >
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className="border-none px-5">
          <AccordionTrigger className="py-5 text-start text-lg font-medium">
            {getLocalized(faq.question, locale)}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground text-body">
            {getLocalized(faq.answer, locale)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
