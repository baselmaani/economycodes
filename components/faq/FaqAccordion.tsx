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
    <Accordion className="border-border w-full divide-y rounded-2xl border">
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
