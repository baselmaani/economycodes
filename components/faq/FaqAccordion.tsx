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
    <Accordion className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="text-start text-base font-medium">
            {getLocalized(faq.question, locale)}
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground">
            {getLocalized(faq.answer, locale)}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
