import { SOFTWARE_DEMO_INQUIRY, softwareDemoInquiryLabel } from "./software";
import { softwareDemoMessage } from "./software-pages";
import type { Localized } from "./types";

/**
 * General contact-form topics, one per offering. Each landing page's primary
 * CTA links to /kontakt?amne=<query>; components/forms/ContactInquiryPrefill
 * then selects `value` in the topic dropdown and starts the message.
 *
 * `value` is what the form submits as `service` (lib/validation/contact.ts)
 * and must never collide with a service key in content/services.ts. A single
 * service can be preselected the same way with ?amne=<service key>.
 */
export type InquiryTopicKey =
  "redovisning" | "marknadsforing" | "utveckling" | "demo";

export interface InquiryTopic {
  /** Value of the ?amne= query parameter. */
  query: string;
  /** Submitted as the form's `service` field. */
  value: string;
  /** Option label in the topic dropdown. */
  label: Localized<string>;
  /** Starter text put in an empty message field. */
  message: Localized<string>;
  /** Swedish label and subject prefix for the notification email. */
  email: { label: string; subject: string };
}

export const inquiryTopics: Record<InquiryTopicKey, InquiryTopic> = {
  redovisning: {
    query: "redovisning",
    value: "redovisning-konsultation",
    label: {
      sv: "Redovisning – boka en konsultation",
      en: "Accounting – book a consultation",
      ar: "المحاسبة – احجز استشارة",
    },
    message: {
      sv: "Hej! Jag vill boka en konsultation om redovisning för mitt företag. Företagsform och vad jag behöver hjälp med: ",
      en: "Hi! I would like to book a consultation about accounting for my company. Company type and what I need help with: ",
      ar: "مرحبًا! أود حجز استشارة بخصوص المحاسبة لشركتي. نوع الشركة وما أحتاج إليه: ",
    },
    email: {
      label: "Redovisning – konsultation",
      subject: "Konsultationsförfrågan redovisning",
    },
  },
  marknadsforing: {
    query: "marknadsforing",
    value: "digital-marknadsforing-forfragan",
    label: {
      sv: "Digital marknadsföring – berätta om ditt projekt",
      en: "Digital marketing – tell us about your project",
      ar: "التسويق الرقمي – أخبرنا عن مشروعك",
    },
    message: {
      sv: "Hej! Jag vill ha hjälp med digital marknadsföring. Företag, webbplats och vad jag vill uppnå: ",
      en: "Hi! I would like help with digital marketing. Company, website and what I want to achieve: ",
      ar: "مرحبًا! أريد مساعدة في التسويق الرقمي. الشركة والموقع الإلكتروني وما أريد تحقيقه: ",
    },
    email: {
      label: "Digital marknadsföring – förfrågan",
      subject: "Förfrågan digital marknadsföring",
    },
  },
  utveckling: {
    query: "utveckling",
    value: "systemutveckling-forfragan",
    label: {
      sv: "Systemutveckling – berätta om ditt projekt",
      en: "Software development – tell us about your project",
      ar: "تطوير البرمجيات – أخبرنا عن مشروعك",
    },
    message: {
      sv: "Hej! Jag vill ha hjälp med systemutveckling. Vad jag vill bygga (t.ex. app, webbtjänst eller internt system) och vilket problem det ska lösa: ",
      en: "Hi! I would like help with software development. What I want to build (e.g. an app, web service or internal system) and the problem it should solve: ",
      ar: "مرحبًا! أريد مساعدة في تطوير البرمجيات. ما أريد بناءه (مثل تطبيق أو خدمة ويب أو نظام داخلي) والمشكلة التي يجب أن يحلها: ",
    },
    email: {
      label: "Systemutveckling – förfrågan",
      subject: "Förfrågan systemutveckling",
    },
  },
  demo: {
    query: "demo",
    value: SOFTWARE_DEMO_INQUIRY,
    label: softwareDemoInquiryLabel,
    message: softwareDemoMessage,
    email: {
      label: "Produktdemo – bokföringsprogrammet Economy Codes",
      subject: "Demoförfrågan bokföringsprogram",
    },
  },
};

export const inquiryTopicList: InquiryTopic[] = Object.values(inquiryTopics);

/** The topic a submitted `service` value belongs to, if it is a general topic. */
export function findInquiryTopicByValue(
  value: string | undefined,
): InquiryTopic | undefined {
  return inquiryTopicList.find((topic) => topic.value === value);
}
