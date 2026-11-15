import type { Faq, Localized } from "./types";
import { offerings } from "./offerings";
import type { SoftwarePageKey } from "./software";
import type { SoftwareShotId } from "./software-shot-ids";

/**
 * Copy for the /bokforingsprogram pages. Button and screen names in quotes
 * are the app's own labels in each language (economycodes-faktura
 * lib/translations/*.ts); keep them in sync if the app renames them.
 */

export type SoftwareFaq = Pick<Faq, "id" | "question" | "answer">;

export interface SoftwareStep {
  title: Localized<string>;
  body: Localized<string>;
  shot?: SoftwareShotId;
}

export interface SoftwareFeature {
  /** Anchor id on the page. */
  id: string;
  title: Localized<string>;
  paragraphs: Localized<string[]>;
  bullets?: Localized<string[]>;
  /** A worked example from the demo company, shown in its own box. */
  example?: { title: Localized<string>; body: Localized<string> };
  /** Small label, e.g. that a module is opt-in. */
  badge?: Localized<string>;
  shot?: SoftwareShotId;
}

export interface SoftwareSubpageContent {
  key: Exclude<SoftwarePageKey, "overview">;
  hero: {
    eyebrow: Localized<string>;
    title: Localized<string>;
    lead: Localized<string>;
    shot?: SoftwareShotId;
  };
  workflow: {
    title: Localized<string>;
    lead: Localized<string>;
    steps: SoftwareStep[];
  };
  features: SoftwareFeature[];
  faqs: SoftwareFaq[];
  /** Shown only while the page is pending: what has to be verified before launch. */
  pendingNote?: Localized<string>;
}

// ---------------------------------------------------------------------------
// Shared

export const softwareCommon = {
  eyebrow: {
    sv: "Bokföringsprogram",
    en: "Accounting software",
    ar: "برنامج المحاسبة",
  },
  bookDemo: offerings.bokforingsprogram.cta,
  seeFeatures: {
    sv: "Se funktioner",
    en: "See features",
    ar: "اطّلع على الميزات",
  },
  logIn: { sv: "Logga in", en: "Log in", ar: "تسجيل الدخول" },
  readMore: { sv: "Läs mer", en: "Read more", ar: "اقرأ المزيد" },
  openFullSize: {
    sv: "Öppna skärmbilden i full storlek",
    en: "Open the screenshot at full size",
    ar: "افتح لقطة الشاشة بالحجم الكامل",
  },
  demoData: {
    sv: "Skärmbild från Economy Codes med exempeldata",
    en: "Screenshot from Economy Codes with demo data",
    ar: "لقطة شاشة من Economy Codes ببيانات تجريبية",
  },
  exampleLabel: { sv: "Exempel", en: "Example", ar: "مثال" },
  relatedTitle: {
    sv: "Mer om Economy Codes",
    en: "More about Economy Codes",
    ar: "المزيد عن Economy Codes",
  },
  ctaTitle: {
    sv: "Vill du se hur det fungerar för ditt företag?",
    en: "Want to see how it works for your business?",
    ar: "هل تريد أن ترى كيف يعمل لشركتك؟",
  },
  ctaBody: {
    sv: "Boka en demo så går vi igenom fakturering, bokföring och lön i programmet. Har du redan ett konto loggar du in direkt.",
    en: "Book a demo and we will walk you through invoicing, bookkeeping and payroll in the software. If you already have an account, log in directly.",
    ar: "احجز عرضًا توضيحيًا وسنعرض لك الفوترة ومسك الدفاتر والرواتب في البرنامج. إذا كان لديك حساب بالفعل، سجّل الدخول مباشرة.",
  },
  pendingBanner: {
    sv: "Förhandsversion – sidan publiceras när flödet är verifierat i produktion.",
    en: "Preview – this page is published once the workflow is verified in production.",
    ar: "نسخة معاينة – تُنشر هذه الصفحة بعد التحقق من سير العمل في بيئة الإنتاج.",
  },
  screenshotPending: {
    sv: "Skärmbild läggs till från en verifierad körning i produktion.",
    en: "Screenshot to be added from a verified production run.",
    ar: "ستُضاف لقطة شاشة من تشغيل مُتحقق منه في بيئة الإنتاج.",
  },
  faqTitle: {
    sv: "Vanliga frågor",
    en: "Frequently asked questions",
    ar: "الأسئلة الشائعة",
  },
} satisfies Record<string, Localized<string>>;

/** Pre-filled message when a visitor comes from "Boka en demo". */
export const softwareDemoMessage: Localized<string> = {
  sv: "Hej! Jag vill boka en demo av bokföringsprogrammet Economy Codes. Mitt företag: ",
  en: "Hi! I would like to book a demo of the Economy Codes accounting software. My company: ",
  ar: "مرحبًا! أود حجز عرض توضيحي لبرنامج المحاسبة Economy Codes. شركتي: ",
};

// ---------------------------------------------------------------------------
// Overview (/bokforingsprogram)

export const softwareOverview = {
  hero: {
    title: {
      sv: "Bokföringsprogram för småföretag i Sverige",
      en: "Accounting software for small businesses in Sweden",
      ar: "برنامج محاسبة للشركات الصغيرة في السويد",
    },
    lead: {
      sv: "Skapa fakturor, följ upp betalningar och hantera bokföring och lön på ett ställe. Med Economy Codes får du överblick över företagets ekonomi och ser vad du behöver göra härnäst.",
      en: "Create invoices, follow up payments and handle bookkeeping and payroll in one place. With Economy Codes you get an overview of your company's finances and see what you need to do next.",
      ar: "أنشئ الفواتير وتابع المدفوعات وأدِر مسك الدفاتر والرواتب في مكان واحد. مع Economy Codes تحصل على نظرة شاملة على مالية شركتك وترى ما عليك فعله بعد ذلك.",
    },
  },
  walkthrough: {
    title: {
      sv: "Så skickar du en faktura och ser när den är betald",
      en: "How to send an invoice and see when it has been paid",
      ar: "كيف ترسل فاتورة وترى متى دُفعت",
    },
    lead: {
      sv: "Tre steg i programmet, med exempelföretaget Demo Installation AB.",
      en: "Three steps in the software, using the demo company Demo Installation AB.",
      ar: "ثلاث خطوات في البرنامج، باستخدام الشركة التجريبية Demo Installation AB.",
    },
    steps: [
      {
        title: {
          sv: "Skapa fakturan",
          en: "Create the invoice",
          ar: "أنشئ الفاتورة",
        },
        body: {
          sv: "Välj kund och lägg till rader från dina artiklar. Förfallodatumet räknas fram från betalningsvillkoren och summan med moms syns medan du skriver. Klicka på ”Skapa faktura”, eller ”Spara utkast” om du vill fortsätta senare.",
          en: "Choose the customer and add lines from your items. The due date follows from the payment terms, and the total including VAT updates as you type. Click “Create Invoice”, or “Save as draft” to finish later.",
          ar: "اختر العميل وأضف الأسطر من أصنافك. يُحسب تاريخ الاستحقاق من شروط الدفع ويظهر المجموع شاملًا الضريبة أثناء الكتابة. ثم أنشئ الفاتورة، أو احفظها كمسودة لتكملها لاحقًا.",
        },
        shot: "invoice-edit",
      },
      {
        title: {
          sv: "Håll koll på förfallodatumet",
          en: "Keep track of the due date",
          ar: "تابع تاريخ الاستحقاق",
        },
        body: {
          sv: "I listan Kundfakturor ser du varje fakturas förfallodatum och status. Flikarna Skickad, Betald och Förfallen visar vad som väntar på betalning och vad som är försenat.",
          en: "The customer invoice list shows each invoice's due date and status. The Sent, Paid and Overdue tabs show what is waiting for payment and what is late.",
          ar: "تعرض قائمة فواتير العملاء تاريخ استحقاق كل فاتورة وحالتها. تُظهر علامات التبويب المرسلة والمدفوعة والمتأخرة ما ينتظر الدفع وما تأخر.",
        },
        shot: "invoice-list",
      },
      {
        title: {
          sv: "Se att den är betald",
          en: "See that it has been paid",
          ar: "تأكد من أنها دُفعت",
        },
        body: {
          sv: "När pengarna kommer registrerar du inbetalningen på fakturan. Kvar att betala går ner till 0,00 kr och fakturan får statusen Betald.",
          en: "When the money arrives, you register the payment on the invoice. The amount left to pay drops to 0.00 kr and the invoice gets the status Paid.",
          ar: "عند وصول المبلغ تسجّل الدفعة على الفاتورة. ينخفض المبلغ المتبقي إلى 0.00 كرونة وتحصل الفاتورة على حالة مدفوعة.",
        },
        shot: "invoice-paid",
      },
    ] satisfies SoftwareStep[],
  },
  intro: {
    title: {
      sv: "Från första fakturan till månadens löner",
      en: "From the first invoice to the month's salaries",
      ar: "من الفاتورة الأولى إلى رواتب الشهر",
    },
    paragraphs: {
      sv: [
        "När du har gjort ett jobb kan du skapa en faktura, skicka den till kunden och följa betalningen. När en leverantörsfaktura kommer in kan du registrera den och koppla underlaget till bokföringen. När det är dags för lön kan du förbereda lönebeskeden och se vad som ska betalas ut.",
        "Economy Codes är byggt för svenska företag. Du kan anpassa fakturorna efter företaget, hantera moms och använda SIE-filer när du behöver flytta bokföringsdata. Har du anställda kan du också hantera underlaget till arbetsgivardeklarationen, beroende på vilka funktioner som är aktiverade för ditt företag.",
      ],
      en: [
        "When you have finished a job, you can create an invoice, send it to the customer and follow the payment. When a supplier invoice comes in, you can register it and link the document to your books. When it is time for payroll, you can prepare the payslips and see what needs to be paid out.",
        "Economy Codes is built for Swedish companies. You can adapt your invoices to your business, handle VAT and use SIE files when you need to move bookkeeping data. If you have employees, you can also handle the information for the employer declaration, depending on which features are enabled for your company.",
      ],
      ar: [
        "بعد إنجاز العمل يمكنك إنشاء فاتورة وإرسالها إلى العميل ومتابعة الدفع. وعندما تصل فاتورة مورد يمكنك تسجيلها وربط المستند بالدفاتر. وعندما يحين موعد الرواتب يمكنك تجهيز قسائم الرواتب ومعرفة ما يجب دفعه.",
        "صُمم Economy Codes للشركات السويدية. يمكنك تكييف الفواتير مع شركتك، وإدارة ضريبة القيمة المضافة، واستخدام ملفات SIE عندما تحتاج إلى نقل بيانات المحاسبة. وإذا كان لديك موظفون يمكنك أيضًا إعداد بيانات إقرار صاحب العمل، بحسب الميزات المفعّلة لشركتك.",
      ],
    },
  },
  featuresTitle: {
    sv: "Det här gör du i Economy Codes",
    en: "What you do in Economy Codes",
    ar: "ما يمكنك فعله في Economy Codes",
  },
  featuresLead: {
    sv: "Varje del beskrivs utifrån ett vanligt arbetsmoment, med skärmbilder från programmet.",
    en: "Each part is described through an everyday task, with screenshots from the software.",
    ar: "يُشرح كل جزء من خلال مهمة يومية، مع لقطات شاشة من البرنامج.",
  },
  features: [
    {
      page: "fakturering",
      anchor: undefined,
      shot: "invoice-list",
      title: {
        sv: "Skicka fakturor och följ upp betalningar",
        en: "Send invoices and follow up payments",
        ar: "أرسل الفواتير وتابع المدفوعات",
      },
      body: {
        sv: "Från utkast till betald faktura, med återkommande fakturor, OCR-nummer, betal-QR och ROT- och RUT-avdrag för privatkunder.",
        en: "From draft to paid invoice, with recurring invoices, OCR references, payment QR codes and ROT and RUT deductions for private customers.",
        ar: "من المسودة إلى الفاتورة المدفوعة، مع الفواتير المتكررة وأرقام OCR ورموز الدفع QR وخصومات ROT وRUT للعملاء الأفراد.",
      },
    },
    {
      page: "bokforing",
      anchor: "inkop",
      shot: "supplier-invoice",
      title: {
        sv: "Håll koll på inköp och leverantörsfakturor",
        en: "Keep track of purchases and supplier invoices",
        ar: "تابع المشتريات وفواتير الموردين",
      },
      body: {
        sv: "Registrera leverantörsfakturan, bifoga fakturan som underlag och se när den förfaller. Leverantörerna samlas i ett eget register.",
        en: "Register the supplier invoice, attach the document and see when it falls due. Suppliers are kept in their own register.",
        ar: "سجّل فاتورة المورد وأرفق المستند واعرف موعد استحقاقها. يُحفظ الموردون في سجل خاص بهم.",
      },
    },
    {
      page: "bokforing",
      anchor: undefined,
      shot: "voucher",
      title: {
        sv: "Samla bokföring och underlag",
        en: "Keep bookkeeping and documents together",
        ar: "اجمع المحاسبة والمستندات معًا",
      },
      body: {
        sv: "Bokför verifikationer med kvittot kopplat, följ upp i huvudboken och redovisa momsen för perioden.",
        en: "Book vouchers with the receipt attached, follow up in the general ledger and report VAT for the period.",
        ar: "سجّل القيود مع إرفاق الإيصال، وتابع في دفتر الأستاذ العام، وصرّح بالضريبة عن الفترة.",
      },
    },
    {
      page: "bokforing",
      anchor: "sie",
      shot: "sie",
      title: {
        sv: "Flytta bokföringsdata med SIE",
        en: "Move bookkeeping data with SIE",
        ar: "انقل بيانات المحاسبة باستخدام SIE",
      },
      body: {
        sv: "Läs in bokföringen från ditt tidigare program eller exportera ett räkenskapsår till din revisor som en SIE 4-fil.",
        en: "Bring in your books from your previous software, or export a fiscal year for your auditor as an SIE 4 file.",
        ar: "استورد دفاترك من برنامجك السابق، أو صدّر سنة مالية لمدقق الحسابات كملف SIE 4.",
      },
    },
    {
      page: "lon",
      anchor: undefined,
      shot: "payslips",
      title: {
        sv: "Hantera löner och lönebesked",
        en: "Handle salaries and payslips",
        ar: "أدِر الرواتب وقسائمها",
      },
      body: {
        sv: "Skapa lönebesked, granska och godkänn dem, skicka dem till de anställda och se vad som ska betalas ut.",
        en: "Create payslips, review and approve them, send them to your employees and see what needs to be paid out.",
        ar: "أنشئ قسائم الرواتب وراجعها واعتمدها وأرسلها إلى الموظفين واعرف ما يجب دفعه.",
      },
    },
    {
      page: "bokforing",
      anchor: "projekt",
      shot: "project",
      badge: {
        sv: "Tillval",
        en: "Optional module",
        ar: "وحدة اختيارية",
      },
      title: {
        sv: "Följ intäkter och kostnader per projekt",
        en: "Follow revenue and costs per project",
        ar: "تابع الإيرادات والتكاليف لكل مشروع",
      },
      body: {
        sv: "Koppla fakturarader och bokföring till ett projekt och se vad som är fakturerat, betalt och bokfört.",
        en: "Link invoice lines and entries to a project and see what has been invoiced, paid and booked.",
        ar: "اربط أسطر الفواتير والقيود بمشروع واعرف ما فُوتر ودُفع وقُيّد.",
      },
    },
  ] satisfies {
    page: SoftwarePageKey;
    anchor: string | undefined;
    shot: SoftwareShotId;
    badge?: Localized<string>;
    title: Localized<string>;
    body: Localized<string>;
  }[],
  example: {
    title: {
      sv: "Exemplet: ett litet installationsföretag",
      en: "The example: a small installation company",
      ar: "المثال: شركة تركيبات صغيرة",
    },
    body: {
      sv: "Skärmbilderna på de här sidorna kommer från Demo Installation AB, ett påhittat installationsföretag i Trollhättan med två anställda. Företaget installerar värmepumpar och el åt bostadsrättsföreningar, fastighetsägare och privatpersoner, köper material från grossister och betalar ut lön varje månad. Alla namn och belopp är exempeldata.",
      en: "The screenshots on these pages come from Demo Installation AB, a made-up installation company in Trollhättan with two employees. It installs heat pumps and electrics for housing cooperatives, property owners and private customers, buys materials from wholesalers and pays salaries every month. All names and amounts are demo data.",
      ar: "تأتي لقطات الشاشة في هذه الصفحات من Demo Installation AB، وهي شركة تركيبات خيالية في ترولهاتان لديها موظفان. تركّب الشركة المضخات الحرارية والأعمال الكهربائية لجمعيات السكن ومالكي العقارات والأفراد، وتشتري المواد من تجار الجملة وتدفع الرواتب كل شهر. جميع الأسماء والمبالغ بيانات تجريبية.",
    },
  },
  faqs: [
    {
      id: "software-install",
      question: {
        sv: "Behöver jag installera något?",
        en: "Do I need to install anything?",
        ar: "هل أحتاج إلى تثبيت أي شيء؟",
      },
      answer: {
        sv: "Nej. Economy Codes används i webbläsaren och du loggar in på app.economycodes.com.",
        en: "No. Economy Codes runs in your web browser and you log in at app.economycodes.com.",
        ar: "لا. يعمل Economy Codes في متصفح الويب وتسجّل الدخول عبر app.economycodes.com.",
      },
    },
    {
      id: "software-move",
      question: {
        sv: "Kan jag flytta in bokföringen från mitt nuvarande program?",
        en: "Can I bring in the books from my current software?",
        ar: "هل يمكنني نقل دفاتري من برنامجي الحالي؟",
      },
      answer: {
        sv: "Ja, med en SIE 4-fil. Programmet läser in kontoplan, räkenskapsår och verifikationer och visar allt för granskning innan något bokförs. Ingående balanser kan läggas in när räkenskapsåret ännu saknar verifikationer. En fil får vara högst 10 MB och innehålla högst 500 verifikationer.",
        en: "Yes, with an SIE 4 file. The software reads the chart of accounts, fiscal years and vouchers and shows everything for review before anything is booked. Opening balances can be added while the fiscal year has no vouchers yet. A file can be at most 10 MB with at most 500 vouchers.",
        ar: "نعم، باستخدام ملف SIE 4. يقرأ البرنامج دليل الحسابات والسنوات المالية والقيود ويعرض كل شيء للمراجعة قبل تسجيل أي شيء. يمكن إدخال الأرصدة الافتتاحية ما دامت السنة المالية بلا قيود. الحد الأقصى للملف 10 ميغابايت و500 قيد.",
      },
    },
    {
      id: "software-vat",
      question: {
        sv: "Hur hanteras momsen?",
        en: "How is VAT handled?",
        ar: "كيف تُدار ضريبة القيمة المضافة؟",
      },
      answer: {
        sv: "Momsen bokförs från fakturor, leverantörsfakturor och verifikationer. Under Momsredovisning förhandsgranskar du deklarationen för perioden, bokför avräkningen och laddar ner en fil som du lämnar in i Skatteverkets e-tjänst.",
        en: "VAT is booked from invoices, supplier invoices and vouchers. Under VAT settlement you preview the return for the period, book the settlement and download a file that you submit in Skatteverket's e-service.",
        ar: "تُقيَّد الضريبة من الفواتير وفواتير الموردين والقيود. في قسم تسوية الضريبة تعاين الإقرار عن الفترة وتقيد التسوية وتنزّل ملفًا تقدّمه عبر الخدمة الإلكترونية لمصلحة الضرائب Skatteverket.",
      },
    },
    {
      id: "software-modules",
      question: {
        sv: "Ingår alla funktioner från början?",
        en: "Is every feature switched on from the start?",
        ar: "هل جميع الميزات مفعّلة منذ البداية؟",
      },
      answer: {
        sv: "Fakturering, inköp, bokföring, moms, SIE och lön finns från början. Återkommande fakturor, OCR-nummer och ROT/RUT slår du på i försäljningsinställningarna. Projekt är en tillvalsmodul som företagets ägare aktiverar under Funktioner & moduler.",
        en: "Invoicing, purchases, bookkeeping, VAT, SIE and payroll are there from the start. Recurring invoices, OCR references and ROT/RUT are switched on in the sales settings. Projects is an optional module that the company owner enables under Features & modules.",
        ar: "الفوترة والمشتريات ومسك الدفاتر والضريبة وSIE والرواتب متاحة منذ البداية. أما الفواتير المتكررة وأرقام OCR وROT/RUT فتُفعَّل في إعدادات المبيعات. والمشاريع وحدة اختيارية يفعّلها مالك الشركة من الميزات والوحدات.",
      },
    },
    {
      id: "software-demo",
      question: {
        sv: "Kan jag se programmet innan jag bestämmer mig?",
        en: "Can I see the software before I decide?",
        ar: "هل يمكنني رؤية البرنامج قبل أن أقرر؟",
      },
      answer: {
        sv: "Ja. Boka en demo via kontaktformuläret, så visar vi hur fakturering, bokföring och lön fungerar med exempeldata.",
        en: "Yes. Book a demo through the contact form and we will show you how invoicing, bookkeeping and payroll work using demo data.",
        ar: "نعم. احجز عرضًا توضيحيًا عبر نموذج التواصل وسنريك كيف تعمل الفوترة ومسك الدفاتر والرواتب ببيانات تجريبية.",
      },
    },
  ] satisfies SoftwareFaq[],
};

// ---------------------------------------------------------------------------
// Integrations on the overview page: file-based exchanges that are live for
// every customer. Direct AGI sending to Skatteverket and the AI (MCP)
// connection have their own pages (CLIENT-TODO 22-23).

export interface SoftwareIntegration {
  id: string;
  name: Localized<string>;
  /** What it does, concretely. */
  what: Localized<string>;
  /** Who benefits from it. */
  who: Localized<string>;
  page: SoftwarePageKey;
  anchor: string;
}

export const softwareIntegrations = {
  title: {
    sv: "Integrationer och filer",
    en: "Integrations and files",
    ar: "التكاملات والملفات",
  } satisfies Localized<string>,
  lead: {
    sv: "Economy Codes flyttar uppgifter med standardformat: till Skatteverket, till revisorn och mellan bokföringsprogram. Filerna till Skatteverket laddar du ner och lämnar in själv i Skatteverkets e-tjänst.",
    en: "Economy Codes moves information using standard formats: to Skatteverket, to your auditor and between accounting programs. You download the files for Skatteverket and submit them yourself in Skatteverket's e-service.",
    ar: "ينقل Economy Codes البيانات بصيغ قياسية: إلى مصلحة الضرائب Skatteverket وإلى مدقق الحسابات وبين برامج المحاسبة. تنزّل الملفات الخاصة بمصلحة الضرائب وتقدّمها بنفسك في خدمتها الإلكترونية.",
  } satisfies Localized<string>,
  items: [
    {
      id: "sie",
      name: { sv: "SIE 4", en: "SIE 4", ar: "SIE 4" },
      what: {
        sv: "Läs in kontoplan, räkenskapsår och verifikationer från ditt tidigare program, och exportera ett räkenskapsår som en SIE 4-fil.",
        en: "Import the chart of accounts, fiscal years and vouchers from your previous software, and export a fiscal year as an SIE 4 file.",
        ar: "استورد دليل الحسابات والسنوات المالية والقيود من برنامجك السابق، وصدّر سنة مالية كملف SIE 4.",
      },
      who: {
        sv: "För dig som byter program eller lämnar bokföringen till en revisor.",
        en: "For you if you are switching software or handing your books to an auditor.",
        ar: "لك إذا كنت تنتقل من برنامج آخر أو تسلّم دفاترك لمدقق حسابات.",
      },
      page: "bokforing",
      anchor: "sie",
    },
    {
      id: "moms",
      name: {
        sv: "Momsdeklaration till Skatteverket",
        en: "VAT return for Skatteverket",
        ar: "إقرار ضريبة القيمة المضافة لمصلحة الضرائب",
      },
      what: {
        sv: "Förhandsgranska momsdeklarationen för perioden, bokför avräkningen och ladda ner en fil som du lämnar in i Skatteverkets e-tjänst.",
        en: "Preview the VAT return for the period, book the settlement and download a file that you submit in Skatteverket's e-service.",
        ar: "عاين إقرار الضريبة عن الفترة وقيّد التسوية ونزّل ملفًا تقدّمه في الخدمة الإلكترونية لمصلحة الضرائب.",
      },
      who: {
        sv: "För momsregistrerade företag som redovisar momsen själva.",
        en: "For VAT-registered companies that report their own VAT.",
        ar: "للشركات المسجلة في ضريبة القيمة المضافة التي تقدّم إقراراتها بنفسها.",
      },
      page: "bokforing",
      anchor: "perioder-moms",
    },
    {
      id: "rot-rut",
      name: {
        sv: "ROT/RUT-begäran till Skatteverket",
        en: "ROT/RUT claims for Skatteverket",
        ar: "طلبات ROT/RUT لمصلحة الضرائب",
      },
      what: {
        sv: "Fakturera med ROT- eller RUT-avdrag och exportera begäran som en fil till Skatteverkets e-tjänst för rot och rut.",
        en: "Invoice with a ROT or RUT deduction and export the claim as a file for Skatteverket's ROT and RUT e-service.",
        ar: "أصدر فواتير مع خصم ROT أو RUT وصدّر الطلب كملف للخدمة الإلكترونية لمصلحة الضرائب الخاصة بـ ROT وRUT.",
      },
      who: {
        sv: "För hantverkare och tjänsteföretag som utför ROT- eller RUT-arbeten.",
        en: "For tradespeople and service companies doing ROT or RUT work.",
        ar: "للحرفيين وشركات الخدمات التي تنفذ أعمال ROT أو RUT.",
      },
      page: "fakturering",
      anchor: "rot-rut",
    },
    {
      id: "betal-qr",
      name: {
        sv: "OCR-nummer och betal-QR",
        en: "OCR references and payment QR codes",
        ar: "أرقام OCR ورموز الدفع QR",
      },
      what: {
        sv: "Fakturor i svenska kronor med bankgiro eller plusgiro får en QR-kod enligt bankernas standard, och med OCR aktiverat ett OCR-nummer.",
        en: "Invoices in Swedish kronor with a Bankgiro or Plusgiro number get a QR code following the banks' standard, and an OCR reference when OCR is on.",
        ar: "تحصل الفواتير بالكرونة السويدية التي تحمل رقم Bankgiro أو Plusgiro على رمز QR وفق معيار البنوك، وعلى رقم OCR عند تفعيله.",
      },
      who: {
        sv: "För dina kunder, som kan betala genom att skanna koden i bankappen.",
        en: "For your customers, who can pay by scanning the code in their banking app.",
        ar: "لعملائك الذين يمكنهم الدفع بمسح الرمز في تطبيق البنك.",
      },
      page: "fakturering",
      anchor: "ocr-qr",
    },
  ] satisfies SoftwareIntegration[],
};

/** Pointer to the accounting service for visitors who'd rather not do it themselves. */
export const softwareOrAccounting = {
  title: {
    sv: "Vill du hellre att någon annan sköter bokföringen?",
    en: "Would you rather someone else did the bookkeeping?",
    ar: "هل تفضّل أن يتولى شخص آخر مسك الدفاتر؟",
  } satisfies Localized<string>,
  body: {
    sv: "Economy Codes AB är också en Srf-auktoriserad redovisningsbyrå. Då skickar du underlagen till oss och vi sköter bokföring, lön, moms, bokslut och deklaration.",
    en: "Economy Codes AB is also an Srf-authorized accounting firm. You send us your documents and we handle bookkeeping, payroll, VAT, annual accounts and tax returns.",
    ar: "Economy Codes AB هو أيضًا مكتب محاسبة معتمد من Srf. ترسل إلينا مستنداتك ونتولى مسك الدفاتر والرواتب وضريبة القيمة المضافة والإغلاق السنوي والإقرارات الضريبية.",
  } satisfies Localized<string>,
  link: {
    sv: "Läs om redovisningstjänsterna",
    en: "Read about the accounting services",
    ar: "اقرأ عن خدمات المحاسبة",
  } satisfies Localized<string>,
};

// ---------------------------------------------------------------------------
// Fakturering

const fakturering: SoftwareSubpageContent = {
  key: "fakturering",
  hero: {
    eyebrow: { sv: "Fakturering", en: "Invoicing", ar: "الفوترة" },
    title: {
      sv: "Faktureringsprogram för småföretag",
      en: "Invoicing software for small businesses",
      ar: "برنامج فوترة للشركات الصغيرة",
    },
    lead: {
      sv: "Skapa fakturor från dina egna artiklar, skicka dem som PDF via e-post och se direkt vad som är betalt, obetalt eller förfallet.",
      en: "Create invoices from your own items, send them as PDFs by e-mail and see at a glance what is paid, unpaid or overdue.",
      ar: "أنشئ الفواتير من أصنافك، وأرسلها بصيغة PDF عبر البريد الإلكتروني، واعرف فورًا ما دُفع وما لم يُدفع وما تأخر.",
    },
    shot: "invoice-list",
  },
  workflow: {
    title: {
      sv: "Från utkast till betald faktura",
      en: "From draft to paid invoice",
      ar: "من المسودة إلى الفاتورة المدفوعة",
    },
    lead: {
      sv: "Demo Installation AB fakturerar Brf Solgläntan för ett värmepumpsbyte. Så här går fakturan genom programmet.",
      en: "Demo Installation AB invoices Brf Solgläntan for a heat pump replacement. This is how the invoice moves through the software.",
      ar: "تُصدر Demo Installation AB فاتورة إلى Brf Solgläntan مقابل استبدال مضخة حرارية. هكذا تمر الفاتورة عبر البرنامج.",
    },
    steps: [
      {
        title: {
          sv: "Skapa ett utkast",
          en: "Create a draft",
          ar: "أنشئ مسودة",
        },
        body: {
          sv: "Välj kund, fakturadatum och betalningsvillkor och lägg till raderna. Under Kvar att fylla i ser du vad som saknas innan fakturan kan skapas. Med ”Spara utkast” kan du fortsätta senare.",
          en: "Choose the customer, invoice date and payment terms and add the lines. A checklist shows what is still missing before the invoice can be created. “Save as draft” lets you continue later.",
          ar: "اختر العميل وتاريخ الفاتورة وشروط الدفع وأضف الأسطر. تعرض قائمة تحقق ما ينقص قبل إنشاء الفاتورة. ويتيح لك الحفظ كمسودة أن تكمل لاحقًا.",
        },
        shot: "invoice-edit",
      },
      {
        title: {
          sv: "Skapa och skicka",
          en: "Create and send",
          ar: "أنشئ وأرسل",
        },
        body: {
          sv: "”Skapa faktura” ger fakturan ett nummer. Med ”Skicka faktura” skickar du den till kunden som PDF-bilaga via e-post. Du kan också ladda ner PDF:en och skriva ut den.",
          en: "“Create Invoice” gives the invoice a number. “Send Invoice” e-mails it to the customer as a PDF attachment. You can also download the PDF and print it.",
          ar: "يمنح إنشاء الفاتورة رقمًا لها. ويرسلها زر إرسال الفاتورة إلى العميل كمرفق PDF عبر البريد الإلكتروني. ويمكنك أيضًا تنزيل ملف PDF وطباعته.",
        },
      },
      {
        title: {
          sv: "Registrera betalningen",
          en: "Register the payment",
          ar: "سجّل الدفعة",
        },
        body: {
          sv: "När kunden har betalat klickar du på ”Registrera inbetalning”. Fakturan blir Betald och kvar att betala är 0,00 kr. Går förfallodatumet ut utan betalning blir fakturan Förfallen.",
          en: "When the customer has paid, click “Add Payment”. The invoice becomes Paid and nothing is left to pay. If the due date passes without payment, the invoice becomes Overdue.",
          ar: "عندما يدفع العميل سجّل الدفعة على الفاتورة. تصبح الفاتورة مدفوعة ولا يتبقى شيء للدفع. وإذا مر تاريخ الاستحقاق دون دفع تصبح الفاتورة متأخرة.",
        },
        shot: "invoice-paid",
      },
    ],
  },
  features: [
    {
      id: "obetalt",
      title: {
        sv: "Se vad som är obetalt och förfallet",
        en: "See what is unpaid and overdue",
        ar: "اعرف ما لم يُدفع وما تأخر",
      },
      paragraphs: {
        sv: [
          "Översikten visar hur många fakturor som har förfallit och vilka kunder det gäller. Åldersanalysen delar upp kundfordringarna efter hur länge de har varit förfallna.",
          "I listan Kundfakturor filtrerar du på Utkast, Skickad, Betald och Förfallen. Kolumnen Förfaller visar när varje faktura ska vara betald.",
        ],
        en: [
          "The overview shows how many invoices are overdue and which customers they belong to. The ageing analysis splits receivables by how long they have been overdue.",
          "In the customer invoice list you filter on Draft, Sent, Paid and Overdue. The due date column shows when each invoice should be paid.",
        ],
        ar: [
          "تعرض النظرة العامة عدد الفواتير المتأخرة والعملاء المعنيين. ويقسّم تحليل الأعمار الذمم المدينة بحسب مدة تأخرها.",
          "في قائمة فواتير العملاء تصفّي حسب المسودة والمرسلة والمدفوعة والمتأخرة. ويُظهر عمود الاستحقاق موعد دفع كل فاتورة.",
        ],
      },
      shot: "dashboard",
    },
    {
      id: "aterkommande",
      title: {
        sv: "Återkommande fakturor till fasta kunder",
        en: "Recurring invoices for regular customers",
        ar: "فواتير متكررة للعملاء الدائمين",
      },
      paragraphs: {
        sv: [
          "När du har aktiverat återkommande fakturor i försäljningsinställningarna kan en faktura upprepas varje månad, kvartal eller år, med ett slutdatum om du vill. Programmet kan också skicka de nya fakturorna automatiskt via e-post.",
        ],
        en: [
          "Once recurring invoices are enabled in the sales settings, an invoice can repeat every month, quarter or year, with an end date if you want one. The software can also e-mail the new invoices automatically.",
        ],
        ar: [
          "بعد تفعيل الفواتير المتكررة في إعدادات المبيعات يمكن تكرار الفاتورة كل شهر أو ربع سنة أو سنة، مع تاريخ انتهاء إن أردت. ويمكن للبرنامج أيضًا إرسال الفواتير الجديدة تلقائيًا عبر البريد الإلكتروني.",
        ],
      },
      example: {
        title: { sv: "Exempel", en: "Example", ar: "مثال" },
        body: {
          sv: "Bergström Fastigheter AB har ett serviceavtal för sin värmepump. Demo Installation AB fakturerar 1 495 kr plus moms den första varje månad utan att skapa fakturan på nytt.",
          en: "Bergström Fastigheter AB has a service agreement for its heat pump. Demo Installation AB invoices 1,495 kr plus VAT on the first of every month without recreating the invoice.",
          ar: "لدى Bergström Fastigheter AB عقد صيانة لمضختها الحرارية. تُصدر Demo Installation AB فاتورة بمبلغ 1495 كرونة زائد الضريبة في أول كل شهر دون إعادة إنشاء الفاتورة.",
        },
      },
    },
    {
      id: "ocr-qr",
      title: {
        sv: "OCR-nummer och betal-QR",
        en: "OCR references and payment QR codes",
        ar: "أرقام OCR ورموز الدفع QR",
      },
      paragraphs: {
        sv: [
          "När OCR är aktiverat får varje faktura ett OCR-nummer och en inbetalningsavi längst ner. Det gör det enklare att känna igen inbetalningen när den kommer in på kontot.",
          "Fakturor i svenska kronor med bankgiro eller plusgiro får dessutom en QR-kod enligt bankernas standard. Kunden skannar koden med sin bankapp och betalningen fylls i.",
        ],
        en: [
          "With OCR enabled, every invoice gets an OCR reference and a payment slip at the bottom. That makes the payment easier to recognise when it reaches your account.",
          "Invoices in Swedish kronor with a Bankgiro or Plusgiro number also get a QR code following the banks' standard. The customer scans it with their banking app and the payment is filled in.",
        ],
        ar: [
          "عند تفعيل OCR تحصل كل فاتورة على رقم OCR وقسيمة دفع في أسفلها، مما يسهّل التعرف على الدفعة عند وصولها إلى الحساب.",
          "وتحصل الفواتير بالكرونة السويدية التي تحمل رقم Bankgiro أو Plusgiro أيضًا على رمز QR وفق معيار البنوك. يمسح العميل الرمز بتطبيق البنك فتُملأ بيانات الدفع.",
        ],
      },
    },
    {
      id: "rot-rut",
      title: {
        sv: "ROT och RUT för privatkunder",
        en: "ROT and RUT for private customers",
        ar: "ROT وRUT للعملاء الأفراد",
      },
      paragraphs: {
        sv: [
          "Fakturerar du privatpersoner för hantverks- eller hushållstjänster drar du av ROT eller RUT direkt på fakturan. Under ”Uppgifter om arbetet” fyller du i bostaden, typ av arbete, timmar och material.",
          "Med ”Exportera ROT/RUT-begäran” laddar du ner en fil som du lämnar in i Skatteverkets e-tjänst för rot och rut. När Skatteverket har beslutat registrerar du beslutet på fakturan.",
        ],
        en: [
          "If you invoice private individuals for renovation or household services, you deduct ROT or RUT directly on the invoice. Under “Work details” you fill in the property, type of work, hours and materials.",
          "“Export ROT/RUT claim” downloads a file that you submit in Skatteverket's ROT and RUT e-service. Once Skatteverket has decided, you register the decision on the invoice.",
        ],
        ar: [
          "إذا كنت تصدر فواتير لأفراد مقابل أعمال ترميم أو خدمات منزلية فإنك تخصم ROT أو RUT مباشرة على الفاتورة. وفي قسم بيانات العمل تدخل العقار ونوع العمل والساعات والمواد.",
          "يتيح لك زر تصدير طلب ROT/RUT تنزيل ملف تقدّمه في الخدمة الإلكترونية لمصلحة الضرائب Skatteverket الخاصة بـ ROT وRUT. وبعد صدور قرار المصلحة تسجّله على الفاتورة.",
        ],
      },
      example: {
        title: {
          sv: "Exempel: värmepump hos en privatkund",
          en: "Example: a heat pump for a private customer",
          ar: "مثال: مضخة حرارية لعميل فرد",
        },
        body: {
          sv: "Anna Lindqvist får en värmepump installerad i sin villa. Fakturan har material för 68 000 kr och 20 timmars arbete, totalt 101 475 kr med moms. ROT-avdraget är 30 procent av arbetskostnaden, 4 942,50 kr, så Anna betalar 96 532,50 kr. Resten begär företaget från Skatteverket.",
          en: "Anna Lindqvist has a heat pump installed in her house. The invoice has 68,000 kr of materials and 20 hours of work, 101,475 kr in total including VAT. The ROT deduction is 30 percent of the labour cost, 4,942.50 kr, so Anna pays 96,532.50 kr. The company claims the rest from Skatteverket.",
          ar: "تُركَّب لـ Anna Lindqvist مضخة حرارية في منزلها. تتضمن الفاتورة مواد بقيمة 68000 كرونة و20 ساعة عمل، أي 101475 كرونة شاملة الضريبة. خصم ROT هو 30 بالمئة من تكلفة العمل، أي 4942.50 كرونة، فتدفع Anna مبلغ 96532.50 كرونة. وتطلب الشركة الباقي من Skatteverket.",
        },
      },
      shot: "invoice-rot",
    },
    {
      id: "utseende",
      title: {
        sv: "Fakturor som ser ut som ditt företag",
        en: "Invoices that look like your business",
        ar: "فواتير تحمل هوية شركتك",
      },
      paragraphs: {
        sv: [
          "Lägg in företagets logotyp, välj färg på fakturan och skriv en egen fotnot. Du kan visa texten Godkänd för F-skatt och en klausul om dröjsmålsränta.",
        ],
        en: [
          "Add your company logo, choose the invoice colour and write your own footer. You can show the approved-for-F-tax text and a late-payment interest clause.",
        ],
        ar: [
          "أضف شعار شركتك واختر لون الفاتورة واكتب تذييلًا خاصًا. ويمكنك إظهار عبارة الموافقة على ضريبة F وبند فوائد التأخير.",
        ],
      },
    },
    {
      id: "kredit",
      title: {
        sv: "Kreditfakturor och påminnelser",
        en: "Credit notes and reminders",
        ar: "الإشعارات الدائنة والتذكيرات",
      },
      paragraphs: {
        sv: [
          "Blev något fel krediterar du hela fakturan eller bara vissa rader, antal eller belopp. När påminnelser är aktiverade registrerar du en betalningspåminnelse på en förfallen faktura.",
        ],
        en: [
          "If something went wrong, you credit the whole invoice or only selected lines, quantities or amounts. With reminders enabled, you register a payment reminder on an overdue invoice.",
        ],
        ar: [
          "إذا حدث خطأ يمكنك إصدار إشعار دائن للفاتورة كلها أو لأسطر أو كميات أو مبالغ محددة. وعند تفعيل التذكيرات تسجّل تذكير دفع على الفاتورة المتأخرة.",
        ],
      },
    },
  ],
  faqs: [
    {
      id: "invoicing-send",
      question: {
        sv: "Hur får kunden fakturan?",
        en: "How does the customer receive the invoice?",
        ar: "كيف يستلم العميل الفاتورة؟",
      },
      answer: {
        sv: "Du skickar den som PDF-bilaga via e-post direkt från programmet, eller laddar ner PDF:en och skickar eller skriver ut den själv.",
        en: "You e-mail it as a PDF attachment directly from the software, or download the PDF and send or print it yourself.",
        ar: "ترسلها كمرفق PDF عبر البريد الإلكتروني مباشرة من البرنامج، أو تنزّل ملف PDF وترسله أو تطبعه بنفسك.",
      },
    },
    {
      id: "invoicing-booking",
      question: {
        sv: "Bokförs fakturorna automatiskt?",
        en: "Are invoices booked automatically?",
        ar: "هل تُقيَّد الفواتير تلقائيًا؟",
      },
      answer: {
        sv: "Ja. Beroende på bokföringsmetod bokförs fakturan när du bokför den eller när betalningen registreras. Verifikationen syns på fakturan och under Bokföring.",
        en: "Yes. Depending on your accounting method, the invoice is booked when you book it or when the payment is registered. The voucher is shown on the invoice and under Bookkeeping.",
        ar: "نعم. بحسب طريقة المحاسبة تُقيَّد الفاتورة عند ترحيلها أو عند تسجيل الدفعة. ويظهر القيد على الفاتورة وفي قسم المحاسبة.",
      },
    },
    {
      id: "invoicing-overdue",
      question: {
        sv: "Vad händer när en faktura har förfallit?",
        en: "What happens when an invoice is overdue?",
        ar: "ماذا يحدث عندما تتأخر الفاتورة؟",
      },
      answer: {
        sv: "Den får statusen Förfallen och syns på Översikten som en faktura att åtgärda. Har du aktiverat påminnelser kan du registrera en betalningspåminnelse.",
        en: "It gets the status Overdue and appears on the overview as an invoice to deal with. With reminders enabled, you can register a payment reminder.",
        ar: "تحصل على حالة متأخرة وتظهر في النظرة العامة كفاتورة تحتاج إلى متابعة. وعند تفعيل التذكيرات يمكنك تسجيل تذكير دفع.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Bokföring

const bokforing: SoftwareSubpageContent = {
  key: "bokforing",
  hero: {
    eyebrow: { sv: "Bokföring", en: "Bookkeeping", ar: "مسك الدفاتر" },
    title: {
      // Distinct from the accounting service's "Bokföring för småföretag i Sverige".
      sv: "Bokför själv – underlag, moms och SIE",
      en: "Do your own bookkeeping – documents, VAT and SIE",
      ar: "امسك دفاترك بنفسك – المستندات والضريبة وSIE",
    },
    lead: {
      sv: "Registrera leverantörsfakturor, spara kvitton som underlag och bokför verifikationer. Följ sedan upp i huvudboken, momsredovisningen och rapporterna.",
      en: "Register supplier invoices, keep receipts as supporting documents and book vouchers. Then follow up in the general ledger, the VAT settlement and the reports.",
      ar: "سجّل فواتير الموردين واحفظ الإيصالات كمستندات داعمة وسجّل القيود. ثم تابع في دفتر الأستاذ العام وتسوية الضريبة والتقارير.",
    },
    shot: "voucher",
  },
  workflow: {
    title: {
      sv: "Från kvitto till verifikation",
      en: "From receipt to voucher",
      ar: "من الإيصال إلى القيد",
    },
    lead: {
      sv: "Demo Installation AB tankar servicebilen för 1 000 kr. Så hamnar kvittot i bokföringen.",
      en: "Demo Installation AB fills up the service van for 1,000 kr. This is how the receipt ends up in the books.",
      ar: "تملأ Demo Installation AB خزان سيارة الخدمة بمبلغ 1000 كرونة. هكذا يصل الإيصال إلى الدفاتر.",
    },
    steps: [
      {
        title: {
          sv: "Ladda upp underlaget",
          en: "Upload the document",
          ar: "ارفع المستند",
        },
        body: {
          sv: "Under Underlag samlas alla kvitton och fakturor du tagit emot. Klicka på ”Ladda upp underlag”. Fliken Ej kopplade visar det som ännu inte hör till någon verifikation.",
          en: "All the receipts and invoices you receive are collected under Attachments. Click “Upload documents”. The not-linked tab shows what does not yet belong to a voucher.",
          ar: "تُجمع كل الإيصالات والفواتير التي تتلقاها في قسم المرفقات. انقر على رفع مستندات. وتعرض علامة التبويب غير المرتبطة ما لم يُربط بعد بأي قيد.",
        },
        shot: "underlag",
      },
      {
        title: {
          sv: "Bokför verifikationen",
          en: "Book the voucher",
          ar: "سجّل القيد",
        },
        body: {
          sv: "Skapa en ny verifikation med konton i debet och kredit: 800 kr på drivmedel, 200 kr ingående moms och 1 000 kr från företagskontot. Med ”Lägg till underlag” kopplar du kvittot, från datorn eller från Underlag.",
          en: "Create a new voucher with debit and credit accounts: 800 kr for fuel, 200 kr input VAT and 1,000 kr from the business account. “Add attachment” links the receipt, from your computer or from Attachments.",
          ar: "أنشئ قيدًا جديدًا بحسابات مدينة ودائنة: 800 كرونة للوقود و200 كرونة ضريبة مدخلات و1000 كرونة من حساب الشركة. ثم أضف الإيصال كمرفق من حاسوبك أو من المرفقات.",
        },
        shot: "voucher",
      },
      {
        title: {
          sv: "Följ upp i huvudboken",
          en: "Follow up in the general ledger",
          ar: "تابع في دفتر الأستاذ العام",
        },
        body: {
          sv: "Under Kontoanalys ser du huvudboken per konto och verifikationerna bakom varje saldo. Där finns också balansräkning, resultaträkning och saldobalans.",
          en: "Account analysis shows the general ledger per account and the vouchers behind each balance. The balance sheet, income statement and trial balance are there too.",
          ar: "يعرض تحليل الحسابات دفتر الأستاذ العام لكل حساب والقيود وراء كل رصيد. وتجد هناك أيضًا الميزانية العمومية وقائمة الدخل وميزان المراجعة.",
        },
        shot: "ledger",
      },
    ],
  },
  features: [
    {
      id: "inkop",
      title: {
        sv: "Håll koll på inköp och leverantörsfakturor",
        en: "Keep track of purchases and supplier invoices",
        ar: "تابع المشتريات وفواتير الموردين",
      },
      paragraphs: {
        sv: [
          "När en leverantörsfaktura kommer in registrerar du den under Inköp: leverantör, fakturanummer, förfallodatum och rader på rätt konto med moms. Fakturan bifogas som underlag. Sedan attesterar, bokför och betalar du den.",
          "Leverantörerna finns i ett eget register med bankgiro, standardkonto och betalningsvillkor, så nästa faktura från samma leverantör går snabbare. Listan visar vad som är obetalt och hur länge det har varit förfallet.",
        ],
        en: [
          "When a supplier invoice arrives, you register it under Purchases: supplier, invoice number, due date and lines on the right account with VAT. The invoice is attached as the supporting document. Then you approve, book and pay it.",
          "Suppliers are kept in their own register with Bankgiro, default account and payment terms, so the next invoice from the same supplier is quicker. The list shows what is unpaid and how long it has been overdue.",
        ],
        ar: [
          "عند وصول فاتورة مورد تسجّلها في قسم المشتريات: المورد ورقم الفاتورة وتاريخ الاستحقاق والأسطر على الحساب الصحيح مع الضريبة. وتُرفق الفاتورة كمستند داعم. ثم تعتمدها وتقيّدها وتدفعها.",
          "يُحفظ الموردون في سجل خاص مع رقم Bankgiro والحساب الافتراضي وشروط الدفع، فتصبح الفاتورة التالية من المورد نفسه أسرع. وتعرض القائمة ما لم يُدفع ومدة تأخره.",
        ],
      },
      example: {
        title: { sv: "Exempel", en: "Example", ar: "مثال" },
        body: {
          sv: "Rör & Värme Grossist AB skickar en faktura på 8 550 kr för rör och isolering till värmepumpsprojektet. Den bokförs på konto 4010, kopplas till projekt P-104 och förfaller den 27 november.",
          en: "Rör & Värme Grossist AB sends an invoice for 8,550 kr for pipes and insulation for the heat pump project. It is booked to account 4010, linked to project P-104 and falls due on 27 November.",
          ar: "ترسل Rör & Värme Grossist AB فاتورة بمبلغ 8550 كرونة لأنابيب وعزل لمشروع المضخة الحرارية. تُقيَّد على الحساب 4010 وتُربط بالمشروع P-104 وتستحق في 27 نوفمبر.",
        },
      },
      shot: "supplier-invoice",
    },
    {
      id: "perioder-moms",
      title: {
        sv: "Perioder, räkenskapsår och moms",
        en: "Periods, fiscal years and VAT",
        ar: "الفترات والسنوات المالية والضريبة",
      },
      paragraphs: {
        sv: [
          "Bokföringen delas in i räkenskapsår och perioder. När en månad är avstämd låser du perioden så att ingenting ändras i efterhand.",
          "Under Momsredovisning förhandsgranskar du momsdeklarationen för perioden, bokför avräkningen och laddar ner en fil som du lämnar in i Skatteverkets e-tjänst.",
        ],
        en: [
          "The books are divided into fiscal years and periods. When a month has been reconciled, you lock the period so nothing changes afterwards.",
          "Under VAT settlement you preview the VAT return for the period, book the settlement and download a file that you submit in Skatteverket's e-service.",
        ],
        ar: [
          "تُقسَّم الدفاتر إلى سنوات مالية وفترات. وعند مطابقة شهر ما تقفل الفترة حتى لا يتغير شيء لاحقًا.",
          "في قسم تسوية الضريبة تعاين إقرار الضريبة عن الفترة وتقيد التسوية وتنزّل ملفًا تقدّمه في الخدمة الإلكترونية لمصلحة الضرائب Skatteverket.",
        ],
      },
    },
    {
      id: "sie",
      title: {
        sv: "Flytta bokföringsdata med SIE",
        en: "Move bookkeeping data with SIE",
        ar: "انقل بيانات المحاسبة باستخدام SIE",
      },
      paragraphs: {
        sv: [
          "SIE är ett svenskt filformat som bokföringsprogram använder för att lämna över bokföring till varandra. Economy Codes läser och skapar SIE typ 4, som innehåller verifikationerna och inte bara saldon.",
        ],
        en: [
          "SIE is a Swedish file format that accounting software uses to hand bookkeeping over to each other. Economy Codes reads and creates SIE type 4, which contains the vouchers and not only balances.",
        ],
        ar: [
          "SIE صيغة ملفات سويدية تستخدمها برامج المحاسبة لتبادل بيانات الدفاتر. يقرأ Economy Codes وينشئ ملفات SIE من النوع 4، وهي تتضمن القيود وليس الأرصدة فقط.",
        ],
      },
      bullets: {
        sv: [
          "Från ditt tidigare program: välj SIE-filen, granska räkenskapsår, konton och verifikationer och bokför dem sedan i huvudboken. Konton och verifikationsserier som saknas skapas. Ingående balanser kan läggas in om året ännu saknar verifikationer.",
          "Till revisorn: ladda ner en SIE-fil för ett räkenskapsår. Den innehåller kontoplanen, ingående och utgående balanser, resultat och alla verifikationer, och projekt om du använder projektmodulen.",
          "En fil som läses in får vara högst 10 MB med högst 500 verifikationer.",
        ],
        en: [
          "From your previous software: choose the SIE file, review the fiscal year, accounts and vouchers, then commit them to the ledger. Missing accounts and voucher series are created. Opening balances can be added while the year has no vouchers.",
          "For your auditor: download an SIE file for a fiscal year. It contains the chart of accounts, opening and closing balances, results and every voucher, plus projects if you use the projects module.",
          "An imported file can be at most 10 MB with at most 500 vouchers.",
        ],
        ar: [
          "من برنامجك السابق: اختر ملف SIE وراجع السنة المالية والحسابات والقيود ثم رحّلها إلى دفتر الأستاذ. تُنشأ الحسابات وسلاسل القيود الناقصة. ويمكن إدخال الأرصدة الافتتاحية ما دامت السنة بلا قيود.",
          "لمدقق الحسابات: نزّل ملف SIE لسنة مالية. يتضمن دليل الحسابات والأرصدة الافتتاحية والختامية والنتائج وجميع القيود، والمشاريع إن كنت تستخدم وحدة المشاريع.",
          "الحد الأقصى للملف المستورد 10 ميغابايت و500 قيد.",
        ],
      },
      shot: "sie",
    },
    {
      id: "projekt",
      badge: {
        sv: "Tillval under Funktioner & moduler",
        en: "Optional: Features & modules",
        ar: "اختياري: الميزات والوحدات",
      },
      title: {
        sv: "Följ intäkter och kostnader per projekt",
        en: "Follow revenue and costs per project",
        ar: "تابع الإيرادات والتكاليف لكل مشروع",
      },
      paragraphs: {
        sv: [
          "Med projektmodulen kopplar du fakturarader, rader på leverantörsfakturor och verifikationsrader till ett projekt. Projektsidan visar bokförda intäkter och kostnader mot budget, och vad som är fakturerat och betalt. Modulen aktiveras av företagets ägare under Funktioner & moduler.",
        ],
        en: [
          "With the projects module you link invoice lines, supplier invoice lines and voucher lines to a project. The project page shows booked revenue and costs against budget, and what has been invoiced and paid. The company owner enables the module under Features & modules.",
        ],
        ar: [
          "مع وحدة المشاريع تربط أسطر الفواتير وأسطر فواتير الموردين وأسطر القيود بمشروع. وتعرض صفحة المشروع الإيرادات والتكاليف المقيدة مقابل الميزانية وما فُوتر ودُفع. ويفعّل مالك الشركة الوحدة من الميزات والوحدات.",
        ],
      },
      example: {
        title: { sv: "Exempel", en: "Example", ar: "مثال" },
        body: {
          sv: "För projektet P-104, värmepumpsbytet hos Brf Solgläntan, har Demo Installation AB fakturerat 114 200 kr exklusive moms, varav 104 500 kr är betalt. Kostnaderna från leverantörsfakturorna är 48 040 kr, och det bokförda resultatet hittills är 35 560 kr.",
          en: "For project P-104, the heat pump replacement at Brf Solgläntan, Demo Installation AB has invoiced 114,200 kr excluding VAT, of which 104,500 kr has been paid. Costs from supplier invoices are 48,040 kr, and the booked result so far is 35,560 kr.",
          ar: "في المشروع P-104، استبدال المضخة الحرارية لدى Brf Solgläntan، فوترت Demo Installation AB مبلغ 114200 كرونة دون الضريبة، دُفع منها 104500 كرونة. وتبلغ التكاليف من فواتير الموردين 48040 كرونة، والنتيجة المقيدة حتى الآن 35560 كرونة.",
        },
      },
      shot: "project",
    },
  ],
  faqs: [
    {
      id: "bookkeeping-receipt-reading",
      question: {
        sv: "Läser programmet av kvitton automatiskt?",
        en: "Does the software read receipts automatically?",
        ar: "هل يقرأ البرنامج الإيصالات تلقائيًا؟",
      },
      answer: {
        sv: "Nej. Du fyller i belopp och konton själv. Kvittot sparas under Underlag och kopplas till verifikationen, så att varje bokförd post har sitt underlag.",
        en: "No. You fill in the amounts and accounts yourself. The receipt is stored under Attachments and linked to the voucher, so every entry has its supporting document.",
        ar: "لا. تُدخل المبالغ والحسابات بنفسك. ويُحفظ الإيصال في المرفقات ويُربط بالقيد، فيكون لكل قيد مستنده الداعم.",
      },
    },
    {
      id: "bookkeeping-bank",
      question: {
        sv: "Kan jag stämma av mot banken?",
        en: "Can I reconcile against the bank?",
        ar: "هل يمكنني المطابقة مع البنك؟",
      },
      answer: {
        sv: "Ja. Du läser in kontoutdraget som en CSV-fil eller klistrar in raderna från banken. Programmet föreslår vilken faktura eller betalning varje rad hör till, och du bokför eller kopplar raden.",
        en: "Yes. You import the bank statement as a CSV file or paste the rows from your bank. The software suggests which invoice or payment each row belongs to, and you book or match the row.",
        ar: "نعم. تستورد كشف الحساب كملف CSV أو تلصق الأسطر من البنك. ويقترح البرنامج الفاتورة أو الدفعة التي ينتمي إليها كل سطر، ثم تقيّد السطر أو تربطه.",
      },
    },
    {
      id: "bookkeeping-lock",
      question: {
        sv: "Kan jag låsa en månad som är klar?",
        en: "Can I lock a month that is finished?",
        ar: "هل يمكنني قفل شهر مكتمل؟",
      },
      answer: {
        sv: "Ja. Under Månadsavstämning och perioder låser du perioden. Behöver något rättas kan perioden öppnas igen.",
        en: "Yes. You lock the period under month-end reconciliation and periods. If something needs correcting, the period can be reopened.",
        ar: "نعم. تقفل الفترة من قسم المطابقة الشهرية والفترات. وإذا احتاج شيء إلى تصحيح يمكن إعادة فتح الفترة.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Lön

const lon: SoftwareSubpageContent = {
  key: "lon",
  hero: {
    eyebrow: { sv: "Lön", en: "Payroll", ar: "الرواتب" },
    title: {
      sv: "Löneprogram för småföretag",
      en: "Payroll software for small businesses",
      ar: "برنامج رواتب للشركات الصغيرة",
    },
    lead: {
      sv: "Skapa lönebesked för dina anställda, granska dem innan du godkänner, skicka dem per e-post eller post och se vad som ska betalas ut.",
      en: "Create payslips for your employees, review them before you approve, send them by e-mail or post and see what needs to be paid out.",
      ar: "أنشئ قسائم رواتب لموظفيك وراجعها قبل اعتمادها وأرسلها بالبريد الإلكتروني أو العادي واعرف ما يجب دفعه.",
    },
    shot: "payslips",
  },
  workflow: {
    title: {
      sv: "Från lönemånad till utbetald lön",
      en: "From pay month to salary paid",
      ar: "من شهر الراتب إلى دفع الراتب",
    },
    lead: {
      sv: "Demo Installation AB har två anställda: en VVS-montör och en elektriker. Så går novemberlönen till.",
      en: "Demo Installation AB has two employees: a plumber and an electrician. This is how the November payroll works.",
      ar: "لدى Demo Installation AB موظفان: فني سباكة وكهربائي. هكذا تسير رواتب نوفمبر.",
    },
    steps: [
      {
        title: {
          sv: "Skapa lönebesked",
          en: "Create payslips",
          ar: "أنشئ قسائم الرواتب",
        },
        body: {
          sv: "Klicka på ”Skapa lönebesked”, välj lönemånad och utbetalningsdag och sedan vilka anställda som ska få lön. Skatten räknas fram från Skatteverkets skattetabell för varje anställd.",
          en: "Click “Create payslips”, choose the pay month and pay day, then the employees to be paid. Tax is calculated from Skatteverket's tax table for each employee.",
          ar: "انقر على إنشاء قسائم رواتب واختر شهر الراتب ويوم الدفع ثم الموظفين. ويُحسب الضريبة من جدول الضرائب لمصلحة الضرائب Skatteverket لكل موظف.",
        },
        shot: "payslips",
      },
      {
        title: {
          sv: "Granska och godkänn",
          en: "Review and approve",
          ar: "راجع واعتمد",
        },
        body: {
          sv: "Med ”Förhandsgranska” ser du lönebeskedet som PDF innan det är godkänt. Stämmer allt klickar du på ”Godkänn”, och lönebeskedet blir klart att skicka.",
          en: "“Preview” shows the payslip as a PDF before it is approved. When everything is right, click “Approve” and the payslip is ready to send.",
          ar: "تعرض المعاينة قسيمة الراتب بصيغة PDF قبل اعتمادها. وعندما يكون كل شيء صحيحًا انقر على اعتماد فتصبح القسيمة جاهزة للإرسال.",
        },
      },
      {
        title: {
          sv: "Skicka till de anställda",
          en: "Send to your employees",
          ar: "أرسلها إلى الموظفين",
        },
        body: {
          sv: "Välj per anställd om lönebeskedet ska skickas per e-post eller per post. För post laddar du ner PDF:en och skriver ut den.",
          en: "For each employee, choose whether the payslip goes by e-mail or by post. For post, you download the PDF and print it.",
          ar: "اختر لكل موظف إرسال القسيمة بالبريد الإلكتروني أو بالبريد العادي. وللبريد العادي تنزّل ملف PDF وتطبعه.",
        },
      },
      {
        title: {
          sv: "Betala och bokför",
          en: "Pay and book",
          ar: "ادفع وقيّد",
        },
        body: {
          sv: "”Betala löner” visar vad som ska betalas ut och ger en betalfil med mottagare, clearingnummer, kontonummer och belopp som underlag till banken. När du har betalat bekräftar du varje utbetalning, och programmet bokför lönen med lönebeskedet som underlag.",
          en: "“Pay salaries” shows what to pay out and gives you a payment file with recipient, clearing number, account number and amount to use at your bank. Once you have paid, you confirm each payment and the software books the salary with the payslip attached.",
          ar: "يعرض زر دفع الرواتب ما يجب دفعه ويعطيك ملف دفع يتضمن المستفيد ورقم المقاصة ورقم الحساب والمبلغ لاستخدامه في البنك. وبعد الدفع تؤكد كل دفعة فيقيّد البرنامج الراتب مع إرفاق القسيمة.",
        },
      },
    ],
  },
  features: [
    {
      id: "anstallda",
      title: {
        sv: "Anställda, lön och skatt",
        en: "Employees, salary and tax",
        ar: "الموظفون والرواتب والضريبة",
      },
      paragraphs: {
        sv: [
          "Varje anställd har ett kort med lön, skattetabell och kolumn, bankkonto och e-postadress. Har du anställda i ett annat löneprogram kan du läsa in dem från en fil.",
        ],
        en: [
          "Each employee has a record with salary, tax table and column, bank account and e-mail address. If your employees are in another payroll program, you can import them from a file.",
        ],
        ar: [
          "لكل موظف بطاقة تتضمن الراتب وجدول الضريبة وعموده والحساب البنكي والبريد الإلكتروني. وإذا كان موظفوك في برنامج رواتب آخر يمكنك استيرادهم من ملف.",
        ],
      },
      example: {
        title: { sv: "Exempel", en: "Example", ar: "مثال" },
        body: {
          sv: "Johan Berg, VVS-montör, har 36 500 kr i månadslön. Med skattetabell 32 dras 7 312 kr i skatt och 29 188 kr betalas ut den 25 november.",
          en: "Johan Berg, a plumber, earns 36,500 kr a month. With tax table 32, 7,312 kr is withheld in tax and 29,188 kr is paid out on 25 November.",
          ar: "يتقاضى Johan Berg، فني السباكة، راتبًا شهريًا قدره 36500 كرونة. ووفق جدول الضريبة 32 يُستقطع 7312 كرونة ضريبة ويُدفع 29188 كرونة في 25 نوفمبر.",
        },
      },
    },
    {
      id: "arbetsgivardeklaration",
      title: {
        sv: "Underlag till arbetsgivardeklarationen",
        en: "Information for the employer declaration",
        ar: "بيانات إقرار صاحب العمل",
      },
      paragraphs: {
        sv: [
          "Från lönerna som betalats ut tar programmet fram arbetsgivardeklarationen för månaden: bruttolön, avdragen skatt och arbetsgivaravgifter, per anställd. Du ser vad som ska betalas till Skatteverket och lämnar in deklarationen för månaden.",
        ],
        en: [
          "From the salaries paid, the software prepares the month's employer declaration: gross pay, tax withheld and employer contributions per employee. You see what is due to Skatteverket and file the declaration for the month.",
        ],
        ar: [
          "انطلاقًا من الرواتب المدفوعة يُعدّ البرنامج إقرار صاحب العمل للشهر: الراتب الإجمالي والضريبة المستقطعة واشتراكات صاحب العمل لكل موظف. وترى المبلغ المستحق لمصلحة الضرائب Skatteverket وتقدّم إقرار الشهر.",
        ],
      },
    },
  ],
  faqs: [
    {
      id: "payroll-tax-tables",
      question: {
        sv: "Var kommer skattetabellerna ifrån?",
        en: "Where do the tax tables come from?",
        ar: "من أين تأتي جداول الضرائب؟",
      },
      answer: {
        sv: "Från Skatteverkets skattetabeller för året. Du anger skattetabell och kolumn på den anställdes kort, så räknas skatten fram när lönebeskedet skapas.",
        en: "From Skatteverket's tax tables for the year. You set the tax table and column on the employee's record, and the tax is calculated when the payslip is created.",
        ar: "من جداول الضرائب السنوية لمصلحة الضرائب Skatteverket. تحدد جدول الضريبة وعموده في بطاقة الموظف فتُحسب الضريبة عند إنشاء القسيمة.",
      },
    },
    {
      id: "payroll-paying",
      question: {
        sv: "Betalar programmet ut lönerna?",
        en: "Does the software pay the salaries?",
        ar: "هل يدفع البرنامج الرواتب؟",
      },
      answer: {
        sv: "Nej. Programmet visar vad som ska betalas och ger en betalfil som underlag. Du betalar i banken och bekräftar sedan utbetalningarna, så bokförs lönerna.",
        en: "No. The software shows what to pay and gives you a payment file. You pay in your bank and then confirm the payments, and the salaries are booked.",
        ar: "لا. يعرض البرنامج ما يجب دفعه ويعطيك ملف دفع. تدفع من خلال البنك ثم تؤكد الدفعات فتُقيَّد الرواتب.",
      },
    },
    {
      id: "payroll-delivery",
      question: {
        sv: "Kan de anställda få lönebeskedet per e-post?",
        en: "Can employees get their payslip by e-mail?",
        ar: "هل يمكن للموظفين استلام القسيمة بالبريد الإلكتروني؟",
      },
      answer: {
        sv: "Ja. Du väljer per anställd om lönebeskedet skickas per e-post eller per post. Lönebeskedet sparas också som underlag till bokföringen.",
        en: "Yes. For each employee you choose e-mail or post. The payslip is also stored as a supporting document in the books.",
        ar: "نعم. تختار لكل موظف البريد الإلكتروني أو البريد العادي. وتُحفظ القسيمة أيضًا كمستند داعم في الدفاتر.",
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Integrationer (pending until verified in production)

const skatteverket: SoftwareSubpageContent = {
  key: "skatteverket",
  pendingNote: {
    sv: "Publiceras när en arbetsgivardeklaration har skickats och signerats i produktion för ett pilotföretag, och skärmbilderna är tagna från det flödet.",
    en: "Published once an employer declaration has been sent and signed in production for a pilot company, with screenshots from that run.",
    ar: "تُنشر بعد إرسال إقرار صاحب عمل وتوقيعه في بيئة الإنتاج لشركة تجريبية، مع لقطات شاشة من ذلك التشغيل.",
  },
  hero: {
    eyebrow: {
      sv: "Integration med Skatteverket",
      en: "Skatteverket integration",
      ar: "التكامل مع Skatteverket",
    },
    title: {
      sv: "Arbetsgivardeklaration med Economy Codes",
      en: "Employer declarations with Economy Codes",
      ar: "إقرار صاحب العمل مع Economy Codes",
    },
    lead: {
      sv: "Förbered arbetsgivardeklarationen i Economy Codes och skicka den till Skatteverket. Den som har behörighet granskar och signerar sedan på Mina sidor hos Skatteverket.",
      en: "Prepare the employer declaration in Economy Codes and send it to Skatteverket. Someone with authority then reviews and signs it on Skatteverket's Mina sidor.",
      ar: "جهّز إقرار صاحب العمل في Economy Codes وأرسله إلى Skatteverket. ثم يراجعه الشخص المخوّل ويوقّعه في صفحتي لدى Skatteverket.",
    },
  },
  workflow: {
    title: {
      sv: "Förbered arbetsgivardeklarationen i Economy Codes",
      en: "Prepare the employer declaration in Economy Codes",
      ar: "جهّز إقرار صاحب العمل في Economy Codes",
    },
    lead: {
      sv: "Deklarationen är inlämnad först när den har signerats på Mina sidor. Programmet visar status under hela vägen.",
      en: "The declaration is only filed once it has been signed on Mina sidor. The software shows the status the whole way.",
      ar: "لا يُعدّ الإقرار مقدَّمًا إلا بعد توقيعه في صفحتي. ويعرض البرنامج الحالة طوال الطريق.",
    },
    steps: [
      {
        title: {
          sv: "Ta fram deklarationen",
          en: "Prepare the declaration",
          ar: "أعدّ الإقرار",
        },
        body: {
          sv: "Välj månad under Arbetsgivardeklaration och klicka på ”Lämna in deklaration”. Underlaget hämtas från lönerna som betalats ut under månaden.",
          en: "Choose the month under Employer declaration and click “File declaration”. The figures come from the salaries paid during the month.",
          ar: "اختر الشهر في قسم إقرار صاحب العمل وانقر على تقديم الإقرار. تُؤخذ البيانات من الرواتب المدفوعة خلال الشهر.",
        },
      },
      {
        title: {
          sv: "Skicka till Skatteverket",
          en: "Send to Skatteverket",
          ar: "أرسل إلى Skatteverket",
        },
        body: {
          sv: "Klicka på ”Skicka till Skatteverket”. Status går från Kontrolleras till Klar att signera när Skatteverket har kontrollerat uppgifterna. Med ”Uppdatera status” hämtar du det senaste.",
          en: "Click “Send to Skatteverket”. The status moves from Being checked to Ready to sign once Skatteverket has checked the figures. “Update status” fetches the latest.",
          ar: "انقر على إرسال إلى Skatteverket. تنتقل الحالة من قيد الفحص إلى جاهز للتوقيع بعد أن تتحقق المصلحة من البيانات. ويجلب زر تحديث الحالة آخر المستجدات.",
        },
      },
      {
        title: {
          sv: "Granska och signera på Mina sidor",
          en: "Review and sign on Mina sidor",
          ar: "راجع ووقّع في صفحتي",
        },
        body: {
          sv: "”Granska och signera hos Skatteverket” öppnar Mina sidor, där den som har behörighet granskar och signerar med e-legitimation. Därefter markerar du deklarationen som signerad i programmet.",
          en: "“Review and sign at Skatteverket” opens Mina sidor, where someone with authority reviews and signs with an e-ID. You then mark the declaration as signed in the software.",
          ar: "يفتح زر المراجعة والتوقيع لدى Skatteverket صفحتي، حيث يراجع الشخص المخوّل ويوقّع بالهوية الإلكترونية. ثم تضع علامة على الإقرار بأنه موقّع في البرنامج.",
        },
      },
    ],
  },
  features: [
    {
      id: "ombud",
      title: {
        sv: "Innan du börjar: ombud hos Skatteverket",
        en: "Before you start: agent at Skatteverket",
        ar: "قبل أن تبدأ: الوكيل لدى Skatteverket",
      },
      paragraphs: {
        sv: [
          "För att Economy Codes ska kunna skicka deklarationen behöver företaget ge Economy Codes AB behörighet som registreringsombud eller deklarationsombud för arbetsgivardeklarationen under Ombud och behörigheter hos Skatteverket. Signeringen görs alltid av företaget självt på Mina sidor.",
        ],
        en: [
          "For Economy Codes to send the declaration, the company needs to give Economy Codes AB authority as a registration or declaration agent for the employer declaration under agents and authorisations at Skatteverket. Signing is always done by the company itself on Mina sidor.",
        ],
        ar: [
          "لكي يتمكن Economy Codes من إرسال الإقرار يجب أن تمنح الشركة Economy Codes AB صلاحية وكيل تسجيل أو وكيل إقرار لإقرار صاحب العمل ضمن الوكلاء والصلاحيات لدى Skatteverket. ويتم التوقيع دائمًا من الشركة نفسها في صفحتي.",
        ],
      },
    },
  ],
  faqs: [],
};

const aiMcp: SoftwareSubpageContent = {
  key: "aiMcp",
  pendingNote: {
    sv: "Publiceras när en AI-assistent har anslutits och testats mot ett demoföretag i produktion. Namnge bara assistenter som har testats, och ersätt exempelsvaret med ett riktigt svar från testet.",
    en: "Published once an AI assistant has been connected and tested against a demo company in production. Only name assistants that have been tested, and replace the sample answer with a real one from the test.",
    ar: "تُنشر بعد ربط مساعد ذكاء اصطناعي واختباره على شركة تجريبية في بيئة الإنتاج. لا تذكر إلا المساعدين الذين اختُبروا، واستبدل الإجابة النموذجية بإجابة حقيقية من الاختبار.",
  },
  hero: {
    eyebrow: {
      sv: "AI-anslutning via MCP",
      en: "AI connection via MCP",
      ar: "اتصال الذكاء الاصطناعي عبر MCP",
    },
    title: {
      sv: "Anslut din AI-assistent till Economy Codes",
      en: "Connect your AI assistant to Economy Codes",
      ar: "اربط مساعد الذكاء الاصطناعي بـ Economy Codes",
    },
    lead: {
      sv: "”Vilka kundfakturor har förfallit den här månaden?” Med en AI-anslutning kan en kompatibel AI-assistent svara utifrån företagets egen bokföring, med den behörighet du väljer.",
      en: "“Which customer invoices fell due this month?” With an AI connection, a compatible AI assistant can answer from your company's own books, with the access you choose.",
      ar: "”ما فواتير العملاء التي استحقت هذا الشهر؟“ مع اتصال الذكاء الاصطناعي يمكن لمساعد متوافق أن يجيب من دفاتر شركتك، بالصلاحية التي تختارها.",
    },
  },
  workflow: {
    title: {
      sv: "Så ansluter du en AI-assistent",
      en: "How to connect an AI assistant",
      ar: "كيف تربط مساعد ذكاء اصطناعي",
    },
    lead: {
      sv: "MCP (Model Context Protocol) är kopplingen mellan Economy Codes och AI-assistenten. Du ansluter under Inställningar → AI-anslutningar.",
      en: "MCP (Model Context Protocol) is the connection between Economy Codes and the AI assistant. You connect under Settings → AI connections.",
      ar: "MCP (بروتوكول سياق النموذج) هو الاتصال بين Economy Codes ومساعد الذكاء الاصطناعي. تُجري الربط من الإعدادات ← اتصالات الذكاء الاصطناعي.",
    },
    steps: [
      {
        title: {
          sv: "Lägg till adressen i AI-appen",
          en: "Add the address in the AI app",
          ar: "أضف العنوان في تطبيق الذكاء الاصطناعي",
        },
        body: {
          sv: "Kopiera MCP-serverns adress från AI-anslutningar och lägg till den som en egen koppling i AI-appen.",
          en: "Copy the MCP server address from AI connections and add it as a custom connection in the AI app.",
          ar: "انسخ عنوان خادم MCP من اتصالات الذكاء الاصطناعي وأضفه كاتصال مخصص في تطبيق الذكاء الاصطناعي.",
        },
      },
      {
        title: {
          sv: "Logga in och välj behörighet",
          en: "Log in and choose access",
          ar: "سجّل الدخول واختر الصلاحية",
        },
        body: {
          sv: "AI-appen öppnar Economy Codes. Där väljer du vilka företag appen får arbeta i och vad den får göra: Endast läsa, Läsa och registrera, Registrera och attestera, eller Allt, även stänga perioder. Klicka på ”Tillåt” eller ”Neka”.",
          en: "The AI app opens Economy Codes. There you choose which companies the app may work in and what it may do: Read only, Read and register, Register and approve, or Everything, including closing. Click “Allow” or “Deny”.",
          ar: "يفتح تطبيق الذكاء الاصطناعي Economy Codes. هناك تختار الشركات التي يمكن للتطبيق العمل فيها وما يمكنه فعله: قراءة فقط، أو قراءة وتسجيل، أو تسجيل واعتماد، أو كل شيء بما في ذلك الإقفال. ثم انقر على سماح أو رفض.",
        },
      },
      {
        title: {
          sv: "Ställ din fråga",
          en: "Ask your question",
          ar: "اطرح سؤالك",
        },
        body: {
          sv: "Fråga assistenten om fakturor, leverantörsfakturor, verifikationer, moms eller löner. Svaret bygger på uppgifterna i Economy Codes.",
          en: "Ask the assistant about invoices, supplier invoices, vouchers, VAT or payroll. The answer is based on the data in Economy Codes.",
          ar: "اسأل المساعد عن الفواتير أو فواتير الموردين أو القيود أو الضريبة أو الرواتب. وتستند الإجابة إلى البيانات في Economy Codes.",
        },
      },
    ],
  },
  features: [
    {
      id: "sakerhet",
      title: {
        sv: "Du bestämmer vad assistenten får göra",
        en: "You decide what the assistant may do",
        ar: "أنت تحدد ما يمكن للمساعد فعله",
      },
      paragraphs: {
        sv: [
          "Appen kan aldrig göra mer än din egen roll tillåter. Allt den ändrar syns i behandlingshistoriken, och det som är bestående, som att bokföra, skicka eller betala, visas för dig att godkänna först.",
          "Under Anslutna appar ser du vilka appar som har behörighet. Kopplar du bort en app slutar den fungera direkt.",
        ],
        en: [
          "The app can never do more than your own role allows. Everything it changes appears in the audit history, and anything permanent, such as booking, sending or paying, is shown to you for approval first.",
          "Connected apps shows which apps have access. If you disconnect an app, it stops working immediately.",
        ],
        ar: [
          "لا يمكن للتطبيق أن يفعل أكثر مما يسمح به دورك. ويظهر كل ما يغيّره في سجل المعالجة، وكل إجراء دائم مثل القيد أو الإرسال أو الدفع يُعرض عليك للموافقة أولًا.",
          "تعرض التطبيقات المتصلة التطبيقات التي لديها صلاحية. وإذا فصلت تطبيقًا يتوقف عن العمل فورًا.",
        ],
      },
    },
  ],
  faqs: [],
};

export const softwareSubpages = {
  fakturering,
  bokforing,
  lon,
  skatteverket,
  aiMcp,
} satisfies Record<
  Exclude<SoftwarePageKey, "overview">,
  SoftwareSubpageContent
>;
