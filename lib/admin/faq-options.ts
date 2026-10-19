import { faqs } from "@/content/faqs";

/** FAQ choices for the article editor: id + Swedish question only, to keep the client payload small. */
export function getFaqOptions() {
  return faqs.map((faq) => ({ id: faq.id, question: faq.question.sv }));
}
