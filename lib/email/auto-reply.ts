import { business } from "@/content/business";
import type { ContactFormValues } from "@/lib/validation/contact";

type Locale = ContactFormValues["locale"];

interface AutoReplyCopy {
  subject: string;
  greeting: string;
  body: string[];
  contactIntro: string;
  phoneLabel: string;
  emailLabel: string;
  signOff: string;
}

const COPY: Record<Locale, AutoReplyCopy> = {
  sv: {
    subject: "Tack för ditt meddelande – Economy Codes",
    greeting: "Hej,",
    body: [
      "Tack för att du kontaktade Economy Codes. Vi har tagit emot ditt meddelande.",
      "Vi svarar vanligtvis inom en arbetsdag.",
    ],
    contactIntro: "Om ärendet är brådskande når du oss även här:",
    phoneLabel: "Telefon / WhatsApp",
    emailLabel: "E-post",
    signOff: "Vänliga hälsningar,",
  },
  en: {
    subject: "Thank you for your message – Economy Codes",
    greeting: "Hello,",
    body: [
      "Thank you for contacting Economy Codes. We have received your message.",
      "We usually reply within one business day.",
    ],
    contactIntro: "If your matter is urgent, you can also reach us here:",
    phoneLabel: "Phone / WhatsApp",
    emailLabel: "Email",
    signOff: "Kind regards,",
  },
  ar: {
    subject: "شكراً لرسالتك – Economy Codes",
    greeting: "مرحباً،",
    body: [
      "شكراً لتواصلك مع Economy Codes. لقد استلمنا رسالتك.",
      "نرد عادةً خلال يوم عمل واحد.",
    ],
    contactIntro: "إذا كان الأمر عاجلاً، يمكنك أيضاً التواصل معنا عبر:",
    phoneLabel: "الهاتف / واتساب",
    emailLabel: "البريد الإلكتروني",
    signOff: "مع أطيب التحيات،",
  },
};

/**
 * Confirmation email sent to the visitor after a contact-form submission.
 * Deliberately echoes nothing the visitor typed (not even their name), so the
 * form can't be used to send arbitrary text to arbitrary addresses from our
 * domain.
 */
export function buildAutoReply(locale: Locale): {
  subject: string;
  text: string;
  html: string;
} {
  const copy = COPY[locale];
  const contactLines = [
    `${copy.phoneLabel}: ${business.phone}`,
    `${copy.emailLabel}: ${business.email}`,
  ];

  const text = [
    copy.greeting,
    "",
    ...copy.body,
    "",
    copy.contactIntro,
    ...contactLines,
    "",
    copy.signOff,
    business.brandName,
  ].join("\n");

  const dir = locale === "ar" ? "rtl" : "ltr";
  const html = `<div dir="${dir}" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1a1a1a">
<p>${copy.greeting}</p>
${copy.body.map((line) => `<p>${line}</p>`).join("\n")}
<p>${copy.contactIntro}<br>
${copy.phoneLabel}: <a href="${business.phoneHref}">${business.phone}</a><br>
${copy.emailLabel}: <a href="mailto:${business.email}">${business.email}</a></p>
<p>${copy.signOff}<br>${business.brandName}</p>
</div>`;

  return { subject: copy.subject, text, html };
}
