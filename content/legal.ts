import type { Localized } from "./types";

const LAST_UPDATED = "2026-09-06";

export const privacyPolicy = {
  lastUpdated: LAST_UPDATED,
  title: { sv: "Integritetspolicy", en: "Privacy policy", ar: "سياسة الخصوصية" } satisfies Localized<string>,
  controllerHeading: {
    sv: "Personuppgiftsansvarig",
    en: "Data controller",
    ar: "الجهة المسؤولة عن البيانات",
  } satisfies Localized<string>,
  controllerIntro: {
    sv: "Personuppgiftsansvarig för behandlingen av personuppgifter som samlas in via den här webbplatsen är",
    en: "The data controller for personal data collected via this website is",
    ar: "الجهة المسؤولة عن معالجة البيانات الشخصية التي تُجمع عبر هذا الموقع هي",
  } satisfies Localized<string>,
  orgNumberLabel: {
    sv: "organisationsnummer",
    en: "organisation number",
    ar: "الرقم التنظيمي",
  } satisfies Localized<string>,
  dataCollectedHeading: {
    sv: "Vilka uppgifter vi samlar in",
    en: "What data we collect",
    ar: "ما البيانات التي نجمعها",
  } satisfies Localized<string>,
  dataCollectedBody: {
    sv: "När du använder kontaktformuläret på webbplatsen samlar vi in de uppgifter du själv fyller i, till exempel namn, e-postadress, telefonnummer och ditt meddelande. Uppgifterna används enbart för att kunna besvara din förfrågan.",
    en: "When you use the contact form on this website, we collect the information you provide, such as your name, email address, phone number, and message. This information is only used to respond to your enquiry.",
    ar: "عند استخدامك نموذج التواصل على هذا الموقع، نجمع المعلومات التي تقدمها بنفسك، مثل الاسم والبريد الإلكتروني ورقم الهاتف ورسالتك. تُستخدم هذه المعلومات فقط للرد على استفسارك.",
  } satisfies Localized<string>,
  retentionHeading: {
    sv: "Hur länge vi sparar uppgifter",
    en: "How long we keep data",
    ar: "مدة الاحتفاظ بالبيانات",
  } satisfies Localized<string>,
  retentionBody: {
    sv: "Uppgifter som lämnas via kontaktformuläret sparas så länge det behövs för att hantera din förfrågan, och raderas eller anonymiseras därefter om det inte finns en rättslig grund att spara dem längre, till exempel enligt bokföringslagen för uppgifter kopplade till ett kunduppdrag.",
    en: "Information submitted via the contact form is kept for as long as needed to handle your enquiry, and is then deleted or anonymised unless there is a legal basis to retain it for longer, for example under the Swedish Bookkeeping Act for information related to a client engagement.",
    ar: "تُحفظ المعلومات المقدَّمة عبر نموذج التواصل طالما استلزم الأمر معالجة استفسارك، ثم تُحذف أو تُخفى هويتها ما لم يوجد أساس قانوني للاحتفاظ بها لفترة أطول، كما هو الحال بموجب قانون المحاسبة السويدي بالنسبة للبيانات المرتبطة بتكليف عميل.",
  } satisfies Localized<string>,
  rightsHeading: {
    sv: "Dina rättigheter",
    en: "Your rights",
    ar: "حقوقك",
  } satisfies Localized<string>,
  rightsBody: {
    sv: "Du har rätt att begära information om, rättelse av eller radering av de personuppgifter vi har om dig. Kontakta oss på",
    en: "You have the right to request information about, correction of, or deletion of the personal data we hold about you. Contact us at",
    ar: "لك الحق في طلب معلومات عن بياناتك الشخصية لدينا أو تصحيحها أو حذفها. تواصل معنا عبر",
  } satisfies Localized<string>,
  rightsBodySuffix: {
    sv: "för frågor om dina personuppgifter.",
    en: "for questions about your personal data.",
    ar: "بخصوص أي استفسارات عن بياناتك الشخصية.",
  } satisfies Localized<string>,
  analyticsHeading: {
    sv: "Verktyg för analys och kommunikation",
    en: "Analytics and communication tools",
    ar: "أدوات التحليل والتواصل",
  } satisfies Localized<string>,
  analyticsBody: {
    sv: "Vilka eventuella analys- eller kommunikationsverktyg (till exempel webbstatistik) som används på webbplatsen anges här så snart det är bekräftat:",
    en: "Any analytics or communication tools (such as web statistics) used on this website will be listed here as soon as they are confirmed:",
    ar: "سيُذكر هنا أي أدوات تحليل أو تواصل (مثل إحصاءات الموقع) تُستخدم على هذا الموقع، فور تأكيدها:",
  } satisfies Localized<string>,
};

export const cookiePolicy = {
  lastUpdated: LAST_UPDATED,
  title: { sv: "Cookies", en: "Cookies", ar: "ملفات تعريف الارتباط" } satisfies Localized<string>,
  intro: {
    sv: "En cookie är en liten textfil som sparas i din webbläsare. Den här sidan beskriver vilka cookies som används på economycodes.com och varför.",
    en: "A cookie is a small text file saved in your browser. This page describes which cookies are used on economycodes.com and why.",
    ar: "ملف تعريف الارتباط (كوكي) هو ملف نصي صغير يُحفظ في متصفحك. توضح هذه الصفحة ملفات تعريف الارتباط المستخدمة على economycodes.com وسبب استخدامها.",
  } satisfies Localized<string>,
  necessaryHeading: {
    sv: "Nödvändiga cookies",
    en: "Necessary cookies",
    ar: "ملفات تعريف الارتباط الضرورية",
  } satisfies Localized<string>,
  necessaryBody: {
    sv: "Webbplatsen kan använda enstaka nödvändiga cookies för att komma ihåg ditt val av språk och för grundläggande säkerhetsfunktioner. Dessa krävs för att webbplatsen ska fungera och kan inte stängas av.",
    en: "This website may use a small number of necessary cookies to remember your language choice and for basic security functions. These are required for the website to function and cannot be turned off.",
    ar: "قد يستخدم هذا الموقع عددًا محدودًا من ملفات تعريف الارتباط الضرورية لتذكّر اختيارك للغة ولوظائف أمان أساسية. هذه الملفات ضرورية لعمل الموقع ولا يمكن إيقافها.",
  } satisfies Localized<string>,
  analyticsHeading: {
    sv: "Analys och statistik",
    en: "Analytics and statistics",
    ar: "التحليلات والإحصاءات",
  } satisfies Localized<string>,
  analyticsBody: {
    sv: "Vilka eventuella verktyg för webbanalys eller statistik som används, och hur du kan välja bort dem, anges här så snart det är bekräftat:",
    en: "Any web analytics or statistics tools used, and how you can opt out of them, will be listed here as soon as they are confirmed:",
    ar: "سيُذكر هنا أي أدوات لتحليلات الموقع أو الإحصاءات تُستخدم، وكيفية إلغاء الاشتراك فيها، فور تأكيدها:",
  } satisfies Localized<string>,
  manageHeading: {
    sv: "Hantera cookies i din webbläsare",
    en: "Managing cookies in your browser",
    ar: "إدارة ملفات تعريف الارتباط في متصفحك",
  } satisfies Localized<string>,
  manageBody: {
    sv: "Du kan alltid radera eller blockera cookies via inställningarna i din webbläsare. Observera att vissa delar av webbplatsen kan fungera sämre om du blockerar nödvändiga cookies.",
    en: "You can always delete or block cookies via your browser settings. Note that some parts of the website may work less well if you block necessary cookies.",
    ar: "يمكنك دائمًا حذف ملفات تعريف الارتباط أو حظرها عبر إعدادات متصفحك. يُرجى ملاحظة أن بعض أجزاء الموقع قد تعمل بشكل أقل كفاءة إذا حظرت الملفات الضرورية.",
  } satisfies Localized<string>,
};

export const termsPage = {
  lastUpdated: LAST_UPDATED,
  title: { sv: "Villkor", en: "Terms", ar: "الشروط" } satisfies Localized<string>,
  intro: {
    sv: "Den här sidan ger en allmän översikt av hur uppdrag hos Economy Codes går till. Den ersätter inte ett skriftligt uppdragsavtal, som alltid upprättas separat med varje kund innan ett uppdrag påbörjas.",
    en: "This page gives a general overview of how engagements with Economy Codes work. It does not replace a written engagement agreement, which is always drawn up separately with each client before an engagement begins.",
    ar: "توفر هذه الصفحة نظرة عامة على كيفية سير العمل في التكليفات مع Economy Codes. وهي لا تحل محل اتفاقية تكليف مكتوبة، تُعَدّ دائمًا بشكل منفصل مع كل عميل قبل بدء أي تكليف.",
  } satisfies Localized<string>,
  engagementHeading: {
    sv: "Uppdragsavtal",
    en: "Engagement agreements",
    ar: "اتفاقيات التكليف",
  } satisfies Localized<string>,
  engagementBody: {
    sv: "Innan ett uppdrag inleds går vi tillsammans igenom vad uppdraget omfattar, vad som förväntas av respektive part och hur kommunikationen ska ske.",
    en: "Before an engagement begins, we go through together what it covers, what's expected of each party, and how communication will take place.",
    ar: "قبل بدء أي تكليف، نراجع معًا نطاقه وما هو متوقع من كل طرف وكيفية التواصل.",
  } satisfies Localized<string>,
  privacyHeading: {
    sv: "Personuppgifter",
    en: "Personal data",
    ar: "البيانات الشخصية",
  } satisfies Localized<string>,
  privacyBodyPrefix: {
    sv: "Hur vi hanterar personuppgifter beskrivs i vår",
    en: "How we handle personal data is described in our",
    ar: "توضّح",
  } satisfies Localized<string>,
  privacyLinkLabel: {
    sv: "integritetspolicy",
    en: "privacy policy",
    ar: "سياسة الخصوصية",
  } satisfies Localized<string>,
  privacyBodySuffix: {
    sv: "",
    en: "",
    ar: "كيفية تعاملنا مع البيانات الشخصية.",
  } satisfies Localized<string>,
  liabilityHeading: {
    sv: "Ansvarsbegränsning",
    en: "Limitation of liability",
    ar: "تحديد المسؤولية",
  } satisfies Localized<string>,
  liabilityBody: {
    sv: "Informationen på den här webbplatsen är allmän och ersätter inte individuell rådgivning anpassad till din specifika situation. Exakta villkor, ansvarsbegränsningar och betalningsvillkor för ett specifikt uppdrag anges i det skriftliga uppdragsavtalet:",
    en: "The information on this website is general and does not replace individual advice tailored to your specific situation. The exact terms, limitations of liability, and payment terms for a specific engagement are set out in the written engagement agreement:",
    ar: "المعلومات الواردة في هذا الموقع عامة ولا تغني عن استشارة فردية مصممة لوضعك الخاص. تُحدَّد الشروط الدقيقة وحدود المسؤولية وشروط الدفع لتكليف معين في اتفاقية التكليف المكتوبة:",
  } satisfies Localized<string>,
  contactHeading: {
    sv: "Kontakt",
    en: "Contact",
    ar: "التواصل",
  } satisfies Localized<string>,
  contactBodyPrefix: {
    sv: "Har du frågor om villkoren, kontakta oss på",
    en: "If you have questions about these terms, contact us at",
    ar: "لأي استفسارات حول هذه الشروط، تواصل معنا عبر",
  } satisfies Localized<string>,
};
