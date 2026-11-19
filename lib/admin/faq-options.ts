import "server-only";

import { listFaqs } from "@/lib/cms/service/faqs";

/** FAQ choices for the article editor: id + Swedish question only, to keep the client payload small. */
export async function getFaqOptions() {
  const faqs = await listFaqs();
  return faqs.map((faq) => ({ id: faq.id, question: faq.question.sv }));
}
