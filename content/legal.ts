import type { Localized } from "./types";

const LAST_UPDATED = "2026-11-01";

export const privacyPolicy = {
  lastUpdated: LAST_UPDATED,
  title: {
    sv: "Integritetspolicy",
    en: "Privacy policy",
    ar: "سياسة الخصوصية",
  } satisfies Localized<string>,
  intro: {
    sv: "Den här integritetspolicyn beskriver hur Economy Codes AB samlar in, använder och skyddar personuppgifter när du besöker economycodes.com, kontaktar oss via kontaktformuläret, e-post, telefon eller WhatsApp, eller anlitar oss som kund. Vi behandlar personuppgifter i enlighet med EU:s dataskyddsförordning (GDPR).",
    en: "This privacy policy describes how Economy Codes AB collects, uses and protects personal data when you visit economycodes.com, contact us through the contact form, email, phone or WhatsApp, or engage us as a client. We process personal data in accordance with the EU General Data Protection Regulation (GDPR).",
    ar: "توضح سياسة الخصوصية هذه كيف تجمع Economy Codes AB البيانات الشخصية وتستخدمها وتحميها عند زيارتك economycodes.com أو تواصلك معنا عبر نموذج التواصل أو البريد الإلكتروني أو الهاتف أو واتساب، أو عند تعاملك معنا كعميل. نعالج البيانات الشخصية وفقًا للائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR).",
  } satisfies Localized<string>,
  controllerHeading: {
    sv: "Personuppgiftsansvarig",
    en: "Data controller",
    ar: "الجهة المسؤولة عن البيانات",
  } satisfies Localized<string>,
  controllerIntro: {
    sv: "Personuppgiftsansvarig för behandlingen av personuppgifter som samlas in via den här webbplatsen och våra kontaktkanaler är",
    en: "The data controller for personal data collected via this website and our contact channels is",
    ar: "الجهة المسؤولة عن معالجة البيانات الشخصية التي تُجمع عبر هذا الموقع وقنوات التواصل الخاصة بنا هي",
  } satisfies Localized<string>,
  controllerBodyPrefix: {
    sv: "Du når oss via e-post på",
    en: "You can reach us by email at",
    ar: "يمكنك التواصل معنا عبر البريد الإلكتروني على",
  } satisfies Localized<string>,
  controllerBodySuffix: {
    sv: "eller via telefon och WhatsApp på",
    en: "or by phone and WhatsApp on",
    ar: "أو عبر الهاتف وواتساب على الرقم",
  } satisfies Localized<string>,
  dataCollectedHeading: {
    sv: "Vilka uppgifter vi samlar in",
    en: "What data we collect",
    ar: "ما البيانات التي نجمعها",
  } satisfies Localized<string>,
  dataCollectedBody: {
    sv: "Vi behandlar de uppgifter du själv lämnar till oss. Via kontaktformuläret: namn, e-postadress, telefonnummer och ditt meddelande. Via e-post och telefon: dina kontaktuppgifter och det du berättar för oss. Via WhatsApp: ditt telefonnummer, ditt profilnamn, innehållet i meddelanden och eventuella bifogade filer samt tekniska uppgifter om meddelandena, till exempel tidpunkt och leveransstatus. Om du blir kund behandlar vi dessutom de uppgifter som behövs för uppdraget, till exempel uppgifter om ditt företag och underlag för bokföring, löner och deklarationer.",
    en: "We process the information you provide to us. Through the contact form: your name, email address, phone number and message. By email and phone: your contact details and what you tell us. Through WhatsApp: your phone number, your profile name, the content of messages and any attached files, and technical information about the messages such as time and delivery status. If you become a client, we also process the information needed for the engagement, such as details about your business and the records used for bookkeeping, payroll and tax returns.",
    ar: "نعالج المعلومات التي تقدمها لنا بنفسك. عبر نموذج التواصل: الاسم والبريد الإلكتروني ورقم الهاتف ورسالتك. عبر البريد الإلكتروني والهاتف: بيانات التواصل الخاصة بك وما تخبرنا به. عبر واتساب: رقم هاتفك واسم ملفك الشخصي ومحتوى الرسائل وأي ملفات مرفقة، إضافة إلى معلومات تقنية عن الرسائل مثل وقت الإرسال وحالة التسليم. وإذا أصبحت عميلًا، نعالج أيضًا المعلومات اللازمة للتكليف، مثل بيانات شركتك والمستندات المستخدمة في المحاسبة والرواتب والإقرارات الضريبية.",
  } satisfies Localized<string>,
  purposesHeading: {
    sv: "Varför vi behandlar uppgifterna",
    en: "Why we process the data",
    ar: "لماذا نعالج البيانات",
  } satisfies Localized<string>,
  purposesBody: {
    sv: "Vi använder uppgifterna för att besvara dina frågor och förfrågningar, ta fram offerter och boka möten, utföra och administrera de tjänster du anlitar oss för, skicka meddelanden som rör ditt ärende eller uppdrag, till exempel påminnelser, förfrågningar om underlag och bokningsbekräftelser, samt för att uppfylla våra skyldigheter enligt lag.",
    en: "We use the data to answer your questions and enquiries, prepare quotes and book meetings, carry out and administer the services you engage us for, send messages about your enquiry or engagement, such as reminders, requests for documents and booking confirmations, and meet our legal obligations.",
    ar: "نستخدم البيانات للرد على أسئلتك واستفساراتك، وإعداد عروض الأسعار وحجز المواعيد، وتنفيذ الخدمات التي تكلّفنا بها وإدارتها، وإرسال رسائل تتعلق باستفسارك أو تكليفك، مثل التذكيرات وطلبات المستندات وتأكيدات الحجز، وللوفاء بالتزاماتنا القانونية.",
  } satisfies Localized<string>,
  legalBasisHeading: {
    sv: "Rättslig grund",
    en: "Legal basis",
    ar: "الأساس القانوني",
  } satisfies Localized<string>,
  legalBasisBody: {
    sv: "Vi behandlar uppgifter för att kunna ingå och fullgöra avtal med dig (artikel 6.1 b GDPR), för att uppfylla rättsliga förpliktelser, till exempel enligt bokföringslagen och penningtvättslagen (artikel 6.1 c), och med stöd av vårt berättigade intresse av att besvara förfrågningar som du skickar till oss (artikel 6.1 f). Meddelanden som vi själva tar initiativ till via WhatsApp skickar vi bara om du har samtyckt till det (artikel 6.1 a). Du kan när som helst återkalla ditt samtycke.",
    en: "We process data in order to enter into and perform a contract with you (Article 6(1)(b) GDPR), to meet legal obligations, for example under the Swedish Bookkeeping Act and Anti-Money Laundering Act (Article 6(1)(c)), and on the basis of our legitimate interest in answering enquiries you send us (Article 6(1)(f)). We only send WhatsApp messages that we initiate ourselves if you have consented to receive them (Article 6(1)(a)). You can withdraw your consent at any time.",
    ar: "نعالج البيانات لإبرام عقد معك وتنفيذه (المادة 6(1)(ب) من GDPR)، وللوفاء بالتزامات قانونية، مثل تلك الواردة في قانون المحاسبة السويدي وقانون مكافحة غسل الأموال (المادة 6(1)(ج))، واستنادًا إلى مصلحتنا المشروعة في الرد على الاستفسارات التي ترسلها إلينا (المادة 6(1)(و)). لا نرسل رسائل واتساب بمبادرة منا إلا إذا وافقت على تلقيها (المادة 6(1)(أ)). ويمكنك سحب موافقتك في أي وقت.",
  } satisfies Localized<string>,
  whatsappHeading: {
    sv: "Kommunikation via WhatsApp",
    en: "Communication via WhatsApp",
    ar: "التواصل عبر واتساب",
  } satisfies Localized<string>,
  whatsappBody: {
    sv: "Vi använder WhatsApp Business-plattformen (Cloud API), som tillhandahålls av WhatsApp Ireland Limited, ett bolag inom Meta. Meddelanden mellan dig och oss överförs därför via och lagras tillfälligt hos Meta, som behandlar dem för vår räkning för att kunna leverera dem. WhatsApps egen integritetspolicy gäller också för din användning av WhatsApp. Vi skriver till dig på WhatsApp när du själv har kontaktat oss där, eller när du har samtyckt till att få meddelanden om ditt ärende eller uppdrag. Vi skickar inga marknadsföringsmeddelanden via WhatsApp utan ett separat samtycke. Du kan när som helst sluta ta emot meddelanden genom att svara STOPP eller be oss om det. Vi säljer aldrig dina uppgifter och använder inte innehållet i dina meddelanden för reklam.",
    en: "We use the WhatsApp Business Platform (Cloud API), provided by WhatsApp Ireland Limited, a Meta company. Messages between you and us are therefore transmitted through, and temporarily stored by, Meta, which processes them on our behalf in order to deliver them. WhatsApp's own privacy policy also applies to your use of WhatsApp. We message you on WhatsApp when you have contacted us there yourself, or when you have agreed to receive messages about your enquiry or engagement. We do not send marketing messages on WhatsApp without separate consent. You can stop receiving messages at any time by replying STOP or asking us. We never sell your data and we do not use the content of your messages for advertising.",
    ar: "نستخدم منصة واتساب للأعمال (Cloud API) التي تقدمها شركة WhatsApp Ireland Limited التابعة لمجموعة Meta. لذلك تُنقل الرسائل بيننا وبينك عبر Meta وتُخزَّن لديها مؤقتًا، وتعالجها Meta نيابةً عنا لغرض إيصالها. كما تسري سياسة الخصوصية الخاصة بواتساب على استخدامك للتطبيق. نراسلك عبر واتساب عندما تتواصل معنا هناك بنفسك، أو عندما توافق على تلقي رسائل تتعلق باستفسارك أو تكليفك. لا نرسل رسائل تسويقية عبر واتساب دون موافقة منفصلة. ويمكنك التوقف عن تلقي الرسائل في أي وقت بالرد بكلمة STOP أو بإبلاغنا بذلك. لا نبيع بياناتك أبدًا، ولا نستخدم محتوى رسائلك لأغراض إعلانية.",
  } satisfies Localized<string>,
  sharingHeading: {
    sv: "Vilka vi delar uppgifter med",
    en: "Who we share data with",
    ar: "مع من نشارك البيانات",
  } satisfies Localized<string>,
  sharingBody: {
    sv: "Vi delar bara uppgifter med leverantörer som hjälper oss att driva verksamheten och som behandlar dem för vår räkning: Meta (WhatsApp) för meddelanden, Resend för e-post som skickas från webbplatsen, Vercel för drift av webbplatsen samt leverantören av vår e-posttjänst. Vi kan också lämna ut uppgifter till myndigheter, till exempel Skatteverket, när det krävs enligt lag eller ingår i uppdraget. Vi säljer aldrig personuppgifter.",
    en: "We only share data with providers that help us run the business and process it on our behalf: Meta (WhatsApp) for messaging, Resend for email sent from the website, Vercel for hosting the website, and the provider of our email service. We may also disclose data to public authorities, such as the Swedish Tax Agency, where required by law or as part of an engagement. We never sell personal data.",
    ar: "لا نشارك البيانات إلا مع مزودي خدمات يساعدوننا في تشغيل أعمالنا ويعالجونها نيابةً عنا: Meta (واتساب) للمراسلة، وResend للبريد الإلكتروني المرسل من الموقع، وVercel لاستضافة الموقع، ومزود خدمة البريد الإلكتروني الخاصة بنا. وقد نفصح عن البيانات أيضًا للجهات الحكومية، مثل مصلحة الضرائب السويدية، عندما يقتضي القانون ذلك أو يكون جزءًا من التكليف. لا نبيع البيانات الشخصية أبدًا.",
  } satisfies Localized<string>,
  transfersHeading: {
    sv: "Överföring utanför EU/EES",
    en: "Transfers outside the EU/EEA",
    ar: "نقل البيانات خارج الاتحاد الأوروبي والمنطقة الاقتصادية الأوروبية",
  } satisfies Localized<string>,
  transfersBody: {
    sv: "Vissa av våra leverantörer, däribland Meta, kan behandla uppgifter i länder utanför EU/EES, till exempel i USA. I de fallen sker överföringen med stöd av EU-kommissionens beslut om EU–US Data Privacy Framework eller EU-kommissionens standardavtalsklausuler.",
    en: "Some of our providers, including Meta, may process data in countries outside the EU/EEA, such as the United States. In those cases the transfer is based on the European Commission's adequacy decision for the EU–US Data Privacy Framework or on the European Commission's Standard Contractual Clauses.",
    ar: "قد يعالج بعض مزودي الخدمات لدينا، ومنهم Meta، البيانات في دول خارج الاتحاد الأوروبي والمنطقة الاقتصادية الأوروبية، مثل الولايات المتحدة. وفي هذه الحالات يتم النقل استنادًا إلى قرار المفوضية الأوروبية بشأن إطار خصوصية البيانات بين الاتحاد الأوروبي والولايات المتحدة، أو إلى البنود التعاقدية القياسية الصادرة عن المفوضية الأوروبية.",
  } satisfies Localized<string>,
  retentionHeading: {
    sv: "Hur länge vi sparar uppgifter",
    en: "How long we keep data",
    ar: "مدة الاحتفاظ بالبيانات",
  } satisfies Localized<string>,
  retentionBody: {
    sv: "Uppgifter som lämnas via kontaktformuläret, e-post eller WhatsApp sparas så länge det behövs för att hantera din förfrågan, och raderas eller anonymiseras därefter. Uppgifter som ingår i ett kunduppdrag sparas så länge lagen kräver, till exempel i sju år enligt bokföringslagen.",
    en: "Information submitted via the contact form, email or WhatsApp is kept for as long as needed to handle your enquiry, and is then deleted or anonymised. Information that forms part of a client engagement is kept for as long as the law requires, for example seven years under the Swedish Bookkeeping Act.",
    ar: "تُحفظ المعلومات المقدَّمة عبر نموذج التواصل أو البريد الإلكتروني أو واتساب طالما استلزم الأمر معالجة استفسارك، ثم تُحذف أو تُخفى هويتها. أما المعلومات التي تشكّل جزءًا من تكليف عميل فتُحفظ طوال المدة التي يفرضها القانون، مثل سبع سنوات بموجب قانون المحاسبة السويدي.",
  } satisfies Localized<string>,
  securityHeading: {
    sv: "Säkerhet",
    en: "Security",
    ar: "أمن البيانات",
  } satisfies Localized<string>,
  securityBody: {
    sv: "Vi skyddar uppgifterna med tekniska och organisatoriska åtgärder, till exempel krypterade anslutningar och begränsad behörighet. Meddelanden via WhatsApp krypteras under överföringen.",
    en: "We protect data with technical and organisational measures such as encrypted connections and restricted access. WhatsApp messages are encrypted in transit.",
    ar: "نحمي البيانات بتدابير تقنية وتنظيمية، مثل الاتصالات المشفّرة وتقييد صلاحيات الوصول. وتُشفَّر رسائل واتساب أثناء نقلها.",
  } satisfies Localized<string>,
  rightsHeading: {
    sv: "Dina rättigheter",
    en: "Your rights",
    ar: "حقوقك",
  } satisfies Localized<string>,
  rightsBody: {
    sv: "Du har rätt att få tillgång till de personuppgifter vi har om dig, att få felaktiga uppgifter rättade, att få uppgifter raderade, att begränsa eller invända mot behandlingen, att få ut dina uppgifter i ett maskinläsbart format och att när som helst återkalla ett samtycke. Kontakta oss på",
    en: "You have the right to access the personal data we hold about you, to have inaccurate data corrected, to have data deleted, to restrict or object to the processing, to receive your data in a machine-readable format and to withdraw consent at any time. Contact us at",
    ar: "لك الحق في الاطلاع على البيانات الشخصية التي نحتفظ بها عنك، وتصحيح البيانات غير الدقيقة، وحذف البيانات، وتقييد المعالجة أو الاعتراض عليها، والحصول على بياناتك بصيغة قابلة للقراءة آليًا، وسحب موافقتك في أي وقت. تواصل معنا عبر",
  } satisfies Localized<string>,
  rightsBodySuffix: {
    sv: "om du vill använda dina rättigheter. Om du anser att vi behandlar dina uppgifter felaktigt har du rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY), imy.se.",
    en: "to exercise your rights. If you believe we are processing your data incorrectly, you have the right to lodge a complaint with the Swedish Authority for Privacy Protection (IMY), imy.se.",
    ar: "لممارسة حقوقك. وإذا رأيت أننا نعالج بياناتك بشكل غير صحيح، يحق لك تقديم شكوى إلى هيئة حماية الخصوصية السويدية (IMY) عبر imy.se.",
  } satisfies Localized<string>,
  deletionHeading: {
    sv: "Så begär du att dina uppgifter raderas",
    en: "How to request deletion of your data",
    ar: "كيف تطلب حذف بياناتك",
  } satisfies Localized<string>,
  deletionBodyPrefix: {
    sv: "Du kan när som helst be oss radera dina uppgifter, även konversationer via WhatsApp. Skicka ett e-postmeddelande till",
    en: "You can ask us to delete your data at any time, including WhatsApp conversations. Send an email to",
    ar: "يمكنك أن تطلب منا حذف بياناتك في أي وقت، بما في ذلك محادثات واتساب. أرسل رسالة بريد إلكتروني إلى",
  } satisfies Localized<string>,
  deletionBodySuffix: {
    sv: "eller skriv ”Radera mina uppgifter” till oss på WhatsApp från det nummer du har använt. Vi bekräftar och genomför raderingen inom en månad, utom för uppgifter som vi enligt lag måste spara. Du kan också själv radera chatten i din WhatsApp-app.",
    en: "or send us “Delete my data” on WhatsApp from the number you used. We will confirm and complete the deletion within one month, except for data we are required by law to keep. You can also delete the chat yourself in your WhatsApp app.",
    ar: "أو أرسل إلينا عبارة «احذف بياناتي» على واتساب من الرقم الذي استخدمته. سنؤكد طلبك وننفذ الحذف خلال شهر واحد، باستثناء البيانات التي يُلزمنا القانون بالاحتفاظ بها. ويمكنك أيضًا حذف المحادثة بنفسك من تطبيق واتساب.",
  } satisfies Localized<string>,
  analyticsHeading: {
    sv: "Analys och spårning",
    en: "Analytics and tracking",
    ar: "التحليلات والتتبع",
  } satisfies Localized<string>,
  analyticsBody: {
    sv: "Webbplatsen använder för närvarande inga tredjepartsverktyg för analys, statistik eller spårning, och vi använder inte dina uppgifter för riktad annonsering. Om det ändras uppdateras den här sidan i förväg.",
    en: "This website does not currently use any third-party analytics, statistics, or tracking tools, and we do not use your data for targeted advertising. If that changes, this page will be updated in advance.",
    ar: "لا يستخدم الموقع حاليًا أي أدوات تحليل أو إحصاءات أو تتبع من جهات خارجية، ولا نستخدم بياناتك للإعلانات الموجّهة. وفي حال تغيّر ذلك، سيتم تحديث هذه الصفحة مسبقًا.",
  } satisfies Localized<string>,
  changesHeading: {
    sv: "Ändringar i policyn",
    en: "Changes to this policy",
    ar: "التغييرات على هذه السياسة",
  } satisfies Localized<string>,
  changesBody: {
    sv: "Vi kan uppdatera den här policyn, till exempel om vi börjar använda nya tjänster. Den senaste versionen finns alltid på den här sidan, och datumet överst visar när den senast ändrades.",
    en: "We may update this policy, for example if we start using new services. The latest version is always available on this page, and the date at the top shows when it was last changed.",
    ar: "قد نحدّث هذه السياسة، على سبيل المثال إذا بدأنا استخدام خدمات جديدة. تتوفر أحدث نسخة دائمًا على هذه الصفحة، ويوضح التاريخ في أعلاها موعد آخر تعديل.",
  } satisfies Localized<string>,
};

export const cookiePolicy = {
  lastUpdated: LAST_UPDATED,
  title: {
    sv: "Cookies",
    en: "Cookies",
    ar: "ملفات تعريف الارتباط",
  } satisfies Localized<string>,
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
    sv: "Webbplatsen använder för närvarande inga verktyg för webbanalys eller statistik. Om det ändras uppdateras den här sidan i förväg.",
    en: "This website does not currently use any web analytics or statistics tools. If that changes, this page will be updated in advance.",
    ar: "لا يستخدم الموقع حاليًا أي أدوات لتحليلات الموقع أو الإحصاءات. وفي حال تغيّر ذلك، سيتم تحديث هذه الصفحة مسبقًا.",
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
  title: {
    sv: "Villkor",
    en: "Terms",
    ar: "الشروط",
  } satisfies Localized<string>,
  intro: {
    sv: "Den här sidan ger en allmän översikt av hur uppdrag hos Economy Codes går till. Den ersätter inte ett skriftligt uppdragsavtal, som alltid upprättas separat med varje kund innan ett uppdrag påbörjas.",
    en: "This page gives a general overview of how engagements with Economy Codes work. It does not replace a written engagement agreement, which is always drawn up separately with each client before an engagement begins.",
    ar: "توفر هذه الصفحة نظرة عامة على كيفية سير العمل في التكليفات مع Economy Codes. وهي لا تحل محل اتفاقية تكليف مكتوبة، تُعَدّ دائمًا بشكل منفصل مع كل عميل قبل بدء أي تكليف.",
  } satisfies Localized<string>,
  servicesHeading: {
    sv: "Webbplatsen och våra tjänster",
    en: "The website and our services",
    ar: "الموقع وخدماتنا",
  } satisfies Localized<string>,
  servicesBody: {
    sv: "Webbplatsen economycodes.com drivs av Economy Codes AB, som erbjuder redovisnings- och ekonomitjänster samt digital marknadsföring. Genom att använda webbplatsen eller kontakta oss godkänner du dessa villkor.",
    en: "The website economycodes.com is operated by Economy Codes AB, which provides accounting and financial services as well as digital marketing. By using the website or contacting us, you accept these terms.",
    ar: "يدير موقع economycodes.com شركة Economy Codes AB التي تقدم خدمات المحاسبة والخدمات المالية إلى جانب التسويق الرقمي. باستخدامك الموقع أو تواصلك معنا، فإنك توافق على هذه الشروط.",
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
  whatsappHeading: {
    sv: "Kommunikation via WhatsApp",
    en: "Communication via WhatsApp",
    ar: "التواصل عبر واتساب",
  } satisfies Localized<string>,
  whatsappBody: {
    sv: "Det är frivilligt att kontakta oss via WhatsApp. När du skriver till oss där godkänner du att vi svarar dig i samma kanal. Om du samtycker till det kan vi även skicka meddelanden om ditt ärende eller uppdrag, till exempel påminnelser, förfrågningar om underlag och bokningsbekräftelser. Du kan när som helst avsluta sådana meddelanden genom att svara STOPP. Skicka inte känsliga uppgifter som BankID-uppgifter, lösenord eller kortnummer via WhatsApp. WhatsApps egna villkor gäller för din användning av tjänsten, och eventuella kostnader för datatrafik hos din operatör betalas av dig. Vi strävar efter att svara snabbt men kan inte garantera en viss svarstid.",
    en: "Contacting us on WhatsApp is optional. When you message us there, you agree that we may reply to you in the same channel. If you consent, we may also send messages about your enquiry or engagement, such as reminders, requests for documents and booking confirmations. You can stop such messages at any time by replying STOP. Please do not send sensitive information such as BankID details, passwords or card numbers via WhatsApp. WhatsApp's own terms apply to your use of the service, and any data charges from your mobile operator are your responsibility. We aim to reply promptly but cannot guarantee a specific response time.",
    ar: "التواصل معنا عبر واتساب اختياري. عندما تراسلنا هناك، فإنك توافق على أن نرد عليك عبر القناة نفسها. وإذا وافقت على ذلك، فقد نرسل إليك أيضًا رسائل تتعلق باستفسارك أو تكليفك، مثل التذكيرات وطلبات المستندات وتأكيدات الحجز. ويمكنك إيقاف هذه الرسائل في أي وقت بالرد بكلمة STOP. يُرجى عدم إرسال معلومات حساسة عبر واتساب، مثل بيانات BankID أو كلمات المرور أو أرقام البطاقات. تسري شروط واتساب الخاصة على استخدامك للخدمة، وتتحمل أنت أي رسوم بيانات يفرضها مشغل شبكتك. نحرص على الرد بسرعة، لكن لا يمكننا ضمان مدة رد محددة.",
  } satisfies Localized<string>,
  acceptableUseHeading: {
    sv: "Användning av webbplatsen",
    en: "Use of the website",
    ar: "استخدام الموقع",
  } satisfies Localized<string>,
  acceptableUseBody: {
    sv: "Du får inte använda webbplatsen, kontaktformuläret eller våra meddelandekanaler för att skicka skräppost, olagligt eller kränkande innehåll eller skadlig kod, eller för att försöka få obehörig åtkomst till våra system. Vi kan blockera avsändare som missbrukar våra kanaler.",
    en: "You may not use the website, the contact form or our messaging channels to send spam, unlawful or offensive content or malicious code, or to attempt unauthorised access to our systems. We may block senders who misuse our channels.",
    ar: "لا يجوز لك استخدام الموقع أو نموذج التواصل أو قنوات المراسلة الخاصة بنا لإرسال رسائل مزعجة أو محتوى غير قانوني أو مسيء أو شيفرات ضارة، أو لمحاولة الوصول غير المصرح به إلى أنظمتنا. ويجوز لنا حظر المرسلين الذين يسيئون استخدام قنواتنا.",
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
  intellectualPropertyHeading: {
    sv: "Upphovsrätt",
    en: "Intellectual property",
    ar: "الملكية الفكرية",
  } satisfies Localized<string>,
  intellectualPropertyBody: {
    sv: "Texter, bilder, logotyper och annat innehåll på webbplatsen tillhör Economy Codes AB eller våra licensgivare och får inte kopieras eller användas kommersiellt utan vårt skriftliga godkännande.",
    en: "Text, images, logos and other content on the website belong to Economy Codes AB or our licensors and may not be copied or used commercially without our written permission.",
    ar: "النصوص والصور والشعارات وغيرها من المحتوى على الموقع مملوكة لشركة Economy Codes AB أو للجهات المرخِّصة لنا، ولا يجوز نسخها أو استخدامها تجاريًا دون موافقة خطية منا.",
  } satisfies Localized<string>,
  liabilityHeading: {
    sv: "Ansvarsbegränsning",
    en: "Limitation of liability",
    ar: "تحديد المسؤولية",
  } satisfies Localized<string>,
  liabilityBody: {
    sv: "Informationen på den här webbplatsen är allmän och ersätter inte individuell rådgivning anpassad till din specifika situation. Exakta villkor, ansvarsbegränsningar och betalningsvillkor för ett specifikt uppdrag anges i det skriftliga uppdragsavtalet som upprättas med varje kund.",
    en: "The information on this website is general and does not replace individual advice tailored to your specific situation. The exact terms, limitations of liability, and payment terms for a specific engagement are set out in the written engagement agreement drawn up with each client.",
    ar: "المعلومات الواردة في هذا الموقع عامة ولا تغني عن استشارة فردية مصممة لوضعك الخاص. تُحدَّد الشروط الدقيقة وحدود المسؤولية وشروط الدفع لتكليف معين في اتفاقية التكليف المكتوبة التي تُعَدّ مع كل عميل.",
  } satisfies Localized<string>,
  lawHeading: {
    sv: "Tillämplig lag och tvister",
    en: "Governing law and disputes",
    ar: "القانون المطبق والنزاعات",
  } satisfies Localized<string>,
  lawBody: {
    sv: "Svensk lag gäller för dessa villkor. Tvister ska i första hand lösas genom dialog och annars avgöras av allmän domstol i Sverige.",
    en: "These terms are governed by Swedish law. Disputes should first be resolved through dialogue and otherwise be settled by a general court in Sweden.",
    ar: "تخضع هذه الشروط للقانون السويدي. تُحل النزاعات أولًا عن طريق الحوار، وإلا فتفصل فيها المحاكم العامة في السويد.",
  } satisfies Localized<string>,
  changesHeading: {
    sv: "Ändringar i villkoren",
    en: "Changes to these terms",
    ar: "التغييرات على هذه الشروط",
  } satisfies Localized<string>,
  changesBody: {
    sv: "Vi kan uppdatera villkoren. Den senaste versionen finns alltid på den här sidan, och datumet överst visar när de senast ändrades.",
    en: "We may update these terms. The latest version is always available on this page, and the date at the top shows when they were last changed.",
    ar: "قد نحدّث هذه الشروط. تتوفر أحدث نسخة دائمًا على هذه الصفحة، ويوضح التاريخ في أعلاها موعد آخر تعديل.",
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
  contactBodySuffix: {
    sv: "eller via telefon och WhatsApp på",
    en: "or by phone and WhatsApp on",
    ar: "أو عبر الهاتف وواتساب على الرقم",
  } satisfies Localized<string>,
};
