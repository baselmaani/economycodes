import type { Service } from "./types";
import { MARKETING_RESULTS_DISCLAIMER } from "./disclaimers";

const LAST_REVIEWED = "2026-09-28";

/**
 * Digital marketing services. Spread into `services` in content/services.ts
 * so they share the /tjanster/[slug] detail template, sitemap, OG images and
 * contact-form dropdown with the accounting services. Grouped as "digital"
 * in content/service-icons.ts. Scope, delivery and pricing are not yet
 * confirmed by the client (CLIENT-TODO item 21) -- copy stays general and
 * never promises specific rankings or results.
 */
export const digitalServices: Record<string, Service> = {
  "website-creation": {
    key: "website-creation",
    order: 15,
    slug: {
      sv: "webbplatser",
      en: "website-creation",
      ar: "تصميم-المواقع",
    },
    name: {
      sv: "Webbplatser & hemsidor",
      en: "Website creation",
      ar: "تصميم وإنشاء المواقع",
    },
    summary: {
      sv: "Vi bygger snabba, mobilanpassade webbplatser för småföretag i Sverige — från enkla företagssidor till flerspråkiga sajter på svenska, engelska och arabiska. Webbplatsen byggs med sökmotoroptimering, tillgänglighet och tydliga kontaktvägar från början, så att den blir ett verktyg för att få nya kunder, inte bara ett visitkort.",
      en: "We build fast, mobile-friendly websites for small businesses in Sweden — from simple company pages to multilingual sites in Swedish, English, and Arabic. Every site is built with search optimization, accessibility, and clear contact paths from day one, so it works as a tool for winning new customers, not just a digital business card.",
      ar: "نبني مواقع إلكترونية سريعة ومتوافقة مع الجوال للشركات الصغيرة في السويد — من صفحات تعريفية بسيطة إلى مواقع متعددة اللغات بالسويدية والإنجليزية والعربية. نراعي في كل موقع تحسين محركات البحث وسهولة الوصول ووضوح طرق التواصل منذ البداية، ليصبح أداة لكسب عملاء جدد لا مجرد بطاقة تعريف رقمية.",
    },
    teaser: {
      sv: "Snabba, mobilanpassade och flerspråkiga webbplatser för småföretag.",
      en: "Fast, mobile-friendly and multilingual websites for small businesses.",
      ar: "مواقع سريعة ومتوافقة مع الجوال ومتعددة اللغات للشركات الصغيرة.",
    },
    whoItsFor: {
      sv: [
        "Företag som saknar webbplats eller har en föråldrad sajt",
        "Företagare som vill nå kunder på flera språk",
        "Nystartade företag som behöver en professionell närvaro snabbt",
      ],
      en: [
        "Businesses without a website, or with an outdated one",
        "Business owners who want to reach customers in several languages",
        "New companies that need a professional presence quickly",
      ],
      ar: [
        "الشركات التي لا تملك موقعًا أو لديها موقع قديم",
        "أصحاب الأعمال الراغبون في الوصول إلى العملاء بعدة لغات",
        "الشركات الناشئة التي تحتاج إلى حضور احترافي بسرعة",
      ],
    },
    whatsIncluded: {
      sv: [
        "Struktur, design och texter anpassade efter din verksamhet",
        "Mobilanpassning, snabba laddtider och grundläggande teknisk SEO",
        "Kontaktformulär, kartor och kopplingar till telefon och WhatsApp",
        "Driftsättning, domänkoppling och en genomgång av hur du uppdaterar sidan",
      ],
      en: [
        "Structure, design, and copy tailored to your business",
        "Mobile optimization, fast load times, and core technical SEO",
        "Contact forms, maps, and links to phone and WhatsApp",
        "Launch, domain setup, and a walkthrough of how to update the site",
      ],
      ar: [
        "هيكل وتصميم ونصوص مصممة وفق نشاطك التجاري",
        "التوافق مع الجوال وسرعة التحميل وأساسيات تحسين محركات البحث التقنية",
        "نماذج تواصل وخرائط وروابط للهاتف وواتساب",
        "إطلاق الموقع وربط النطاق وشرح طريقة تحديث الموقع بنفسك",
      ],
    },
    process: {
      sv: [
        "Vi går igenom dina mål, din målgrupp och vilka sidor som behövs",
        "Du får ett förslag på struktur och design att ta ställning till",
        "Vi bygger webbplatsen och fyller den med innehåll tillsammans med dig",
        "Vi testar, lanserar och följer upp att allt fungerar som det ska",
      ],
      en: [
        "We go through your goals, your audience, and which pages you need",
        "You receive a proposed structure and design to review",
        "We build the site and fill it with content together with you",
        "We test, launch, and follow up to make sure everything works",
      ],
      ar: [
        "نراجع أهدافك وجمهورك المستهدف والصفحات التي تحتاجها",
        "تحصل على مقترح للهيكل والتصميم لمراجعته",
        "نبني الموقع ونملؤه بالمحتوى بالتعاون معك",
        "نختبر الموقع ونطلقه ونتابع للتأكد من أن كل شيء يعمل",
      ],
    },
    whatToPrepare: {
      sv: [
        "Logotyp, färger och eventuella bilder du vill använda",
        "En beskrivning av dina tjänster, produkter och kunder",
        "Uppgifter om befintlig domän och webbhotell, om du har det",
      ],
      en: [
        "Your logo, colors, and any images you want to use",
        "A description of your services, products, and customers",
        "Details of your existing domain and hosting, if you have them",
      ],
      ar: [
        "الشعار والألوان وأي صور ترغب في استخدامها",
        "وصف لخدماتك ومنتجاتك وعملائك",
        "بيانات النطاق والاستضافة الحالية إن وُجدت",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "En webbplats som arbetar för ditt företag",
        },
        {
          type: "paragraph",
          text: "För många kunder är webbplatsen det första intrycket av ditt företag. En tydlig, snabb och trovärdig sajt gör det lättare för besökare att förstå vad du erbjuder och ta kontakt. Därför utgår vi från vad besökaren behöver veta och vad du vill att de ska göra, snarare än från ett färdigt tema.",
        },
        {
          type: "heading",
          level: 2,
          text: "Flerspråkigt från början",
        },
        {
          type: "paragraph",
          text: "Riktar du dig till kunder på svenska, engelska eller arabiska kan webbplatsen byggas flerspråkig med rätt språkinställningar, stöd för höger-till-vänster-text och separata adresser per språk, så att varje version kan hittas i sökmotorerna.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "A website that works for your business",
        },
        {
          type: "paragraph",
          text: "For many customers, your website is their first impression of your business. A clear, fast, and credible site makes it easier for visitors to understand what you offer and get in touch. That's why we start from what visitors need to know and what you want them to do, rather than from an off-the-shelf theme.",
        },
        {
          type: "heading",
          level: 2,
          text: "Multilingual from the start",
        },
        {
          type: "paragraph",
          text: "If you serve customers in Swedish, English, or Arabic, the site can be built multilingual with the correct language settings, right-to-left text support, and separate addresses per language, so every version can be found in search engines.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "موقع يعمل لصالح شركتك",
        },
        {
          type: "paragraph",
          text: "يُعد موقعك الإلكتروني الانطباع الأول عن شركتك لدى كثير من العملاء. فالموقع الواضح والسريع والموثوق يسهّل على الزوار فهم ما تقدمه والتواصل معك. لذلك ننطلق مما يحتاج الزائر إلى معرفته وما تريده أن يفعله، بدلًا من الاعتماد على قالب جاهز.",
        },
        {
          type: "heading",
          level: 2,
          text: "متعدد اللغات منذ البداية",
        },
        {
          type: "paragraph",
          text: "إذا كنت تخدم عملاء بالسويدية أو الإنجليزية أو العربية، يمكن بناء الموقع بعدة لغات مع إعدادات اللغة الصحيحة ودعم الكتابة من اليمين إلى اليسار وعناوين منفصلة لكل لغة، بحيث يمكن العثور على كل نسخة في محركات البحث.",
        },
      ],
    },
    faqIds: ["faq-website-cost", "faq-website-ownership"],
    lastReviewed: LAST_REVIEWED,
  },

  seo: {
    key: "seo",
    order: 16,
    slug: {
      sv: "sokmotoroptimering-seo",
      en: "seo",
      ar: "تحسين-محركات-البحث",
    },
    name: {
      sv: "Sökmotoroptimering (SEO)",
      en: "Search engine optimization (SEO)",
      ar: "تحسين محركات البحث (SEO)",
    },
    summary: {
      sv: "Sökmotoroptimering hjälper ditt företag att synas när kunder söker efter det du erbjuder på Google. Vi arbetar med teknisk SEO, innehåll, lokal synlighet och Google-företagsprofil, och följer upp utvecklingen med tydliga rapporter — så att du ser vad som händer och varför, utan att behöva vara expert själv.",
      en: "Search engine optimization helps your business show up when customers search Google for what you offer. We work on technical SEO, content, local visibility, and your Google Business Profile, and track progress with clear reports — so you can see what's happening and why, without having to be an expert yourself.",
      ar: "يساعد تحسين محركات البحث شركتك على الظهور عندما يبحث العملاء في جوجل عمّا تقدمه. نعمل على الجوانب التقنية والمحتوى والظهور المحلي وملف النشاط التجاري على جوجل، ونتابع التقدم بتقارير واضحة — لتعرف ما يحدث ولماذا، دون أن تحتاج إلى أن تكون خبيرًا.",
    },
    teaser: {
      sv: "Syns på Google när kunder söker efter det du erbjuder.",
      en: "Show up on Google when customers search for what you offer.",
      ar: "اظهر على جوجل عندما يبحث العملاء عمّا تقدمه.",
    },
    whoItsFor: {
      sv: [
        "Lokala företag som vill synas för kunder i sitt närområde",
        "Företag vars webbplats får få besök från Google",
        "Företagare som vill minska beroendet av betald annonsering",
      ],
      en: [
        "Local businesses that want to be visible to nearby customers",
        "Businesses whose website gets few visits from Google",
        "Business owners who want to rely less on paid advertising",
      ],
      ar: [
        "الشركات المحلية الراغبة في الظهور للعملاء في منطقتها",
        "الشركات التي لا يحصل موقعها على زيارات كافية من جوجل",
        "أصحاب الأعمال الراغبون في تقليل الاعتماد على الإعلانات المدفوعة",
      ],
    },
    whatsIncluded: {
      sv: [
        "Genomgång av webbplatsens tekniska hälsa, hastighet och indexering",
        "Sökordsanalys utifrån vad dina kunder faktiskt söker på",
        "Optimering av sidtitlar, texter, struktur och intern länkning",
        "Lokal SEO och Google-företagsprofil samt löpande rapportering",
      ],
      en: [
        "A review of your site's technical health, speed, and indexing",
        "Keyword research based on what your customers actually search for",
        "Optimization of page titles, copy, structure, and internal linking",
        "Local SEO, Google Business Profile, and ongoing reporting",
      ],
      ar: [
        "مراجعة السلامة التقنية للموقع وسرعته وفهرسته",
        "تحليل الكلمات المفتاحية بناءً على ما يبحث عنه عملاؤك فعليًا",
        "تحسين عناوين الصفحات والنصوص والهيكل والروابط الداخلية",
        "تحسين البحث المحلي وملف النشاط التجاري على جوجل مع تقارير دورية",
      ],
    },
    process: {
      sv: [
        "Vi gör en nulägesanalys av webbplatsen och dina konkurrenter",
        "Vi tar fram en prioriterad åtgärdslista med de viktigaste förbättringarna först",
        "Vi genomför åtgärderna och tar fram nytt innehåll där det behövs",
        "Vi följer upp med rapporter och justerar arbetet efter resultaten",
      ],
      en: [
        "We analyze the current state of your website and your competitors",
        "We create a prioritized action list with the most important improvements first",
        "We carry out the work and create new content where needed",
        "We follow up with reports and adjust the work based on the results",
      ],
      ar: [
        "نحلل الوضع الحالي لموقعك ولمنافسيك",
        "نعدّ قائمة إجراءات مرتبة حسب الأولوية تبدأ بأهم التحسينات",
        "ننفذ التحسينات وننشئ محتوى جديدًا عند الحاجة",
        "نتابع بتقارير دورية ونعدّل العمل وفق النتائج",
      ],
    },
    whatToPrepare: {
      sv: [
        "Tillgång till webbplatsens administration",
        "Tillgång till Google Search Console och Google Analytics, om det finns",
        "En lista över dina viktigaste tjänster, produkter och orter",
      ],
      en: [
        "Access to your website's admin panel",
        "Access to Google Search Console and Google Analytics, if set up",
        "A list of your most important services, products, and locations",
      ],
      ar: [
        "صلاحية الوصول إلى لوحة إدارة الموقع",
        "صلاحية الوصول إلى Google Search Console وGoogle Analytics إن وُجدا",
        "قائمة بأهم خدماتك ومنتجاتك والمدن التي تعمل فيها",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Varför SEO är en långsiktig investering",
        },
        {
          type: "paragraph",
          text: "Till skillnad från annonser, som slutar ge trafik när budgeten tar slut, bygger sökmotoroptimering upp en synlighet som finns kvar över tid. Arbetet tar ofta några månader innan effekten syns, men varje förbättring av webbplatsens teknik och innehåll bidrar till att fler rätt kunder hittar dig.",
        },
        {
          type: "heading",
          level: 2,
          text: "Mätbart och begripligt",
        },
        {
          type: "paragraph",
          text: "Vi redovisar vad vi har gjort, hur synligheten och trafiken utvecklas och vilka sökningar som leder till förfrågningar. Eftersom vi även arbetar med redovisning kan vi hjälpa dig att sätta marknadsföringen i relation till företagets ekonomi.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.sv },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Why SEO is a long-term investment",
        },
        {
          type: "paragraph",
          text: "Unlike ads, which stop bringing in traffic when the budget runs out, search engine optimization builds visibility that lasts. It often takes a few months before the effect shows, but every improvement to your site's technology and content helps more of the right customers find you.",
        },
        {
          type: "heading",
          level: 2,
          text: "Measurable and understandable",
        },
        {
          type: "paragraph",
          text: "We report what we've done, how your visibility and traffic are developing, and which searches lead to enquiries. Since we also work with accounting, we can help you put your marketing in relation to your company's finances.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.en },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "لماذا يُعد تحسين محركات البحث استثمارًا طويل الأمد",
        },
        {
          type: "paragraph",
          text: "على عكس الإعلانات التي تتوقف عن جلب الزيارات بمجرد انتهاء الميزانية، يبني تحسين محركات البحث ظهورًا يدوم مع الوقت. غالبًا ما يستغرق ظهور الأثر بضعة أشهر، لكن كل تحسين في تقنية الموقع ومحتواه يساعد مزيدًا من العملاء المناسبين على الوصول إليك.",
        },
        {
          type: "heading",
          level: 2,
          text: "قابل للقياس وسهل الفهم",
        },
        {
          type: "paragraph",
          text: "نوضح لك ما قمنا به وكيف يتطور ظهورك وعدد الزيارات، وأي عمليات البحث تؤدي إلى استفسارات. وبما أننا نعمل في المحاسبة أيضًا، يمكننا مساعدتك على ربط التسويق بالوضع المالي لشركتك.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-seo-time", "faq-seo-vs-ads"],
    lastReviewed: LAST_REVIEWED,
  },

  aeo: {
    key: "aeo",
    order: 17,
    slug: {
      sv: "aeo-svarsmotoroptimering",
      en: "answer-engine-optimization",
      ar: "تحسين-محركات-الإجابة",
    },
    name: {
      sv: "AEO – optimering för svarsmotorer",
      en: "Answer engine optimization (AEO)",
      ar: "تحسين محركات الإجابة (AEO)",
    },
    summary: {
      sv: "AEO, Answer Engine Optimization, handlar om att ditt företag ska bli svaret när kunder ställer frågor — i Googles utvalda svar, röstassistenter och AI-sammanfattningar. Vi strukturerar ditt innehåll med tydliga svar, vanliga frågor och strukturerad data, så att sökmotorer och assistenter lättare kan förstå och återge vad du erbjuder.",
      en: "AEO, answer engine optimization, is about making your business the answer when customers ask questions — in Google's featured snippets, voice assistants, and AI summaries. We structure your content with clear answers, FAQs, and structured data so search engines and assistants can more easily understand and present what you offer.",
      ar: "يهدف تحسين محركات الإجابة (AEO) إلى أن تكون شركتك هي الإجابة عندما يطرح العملاء أسئلتهم — في المقتطفات المميزة على جوجل والمساعدات الصوتية وملخصات الذكاء الاصطناعي. ننظّم محتواك بإجابات واضحة وأسئلة شائعة وبيانات منظمة، ليسهل على محركات البحث والمساعدات فهم ما تقدمه وعرضه.",
    },
    teaser: {
      sv: "Bli svaret i Googles utvalda svar, röstassistenter och AI-sammanfattningar.",
      en: "Become the answer in featured snippets, voice assistants and AI summaries.",
      ar: "كن الإجابة في مقتطفات جوجل والمساعدات الصوتية وملخصات الذكاء الاصطناعي.",
    },
    whoItsFor: {
      sv: [
        "Företag vars kunder ofta söker med frågor, som ”hur” och ”vad kostar”",
        "Företag som redan har en webbplats men sällan syns i utvalda svar",
        "Tjänsteföretag som vill framstå som en kunnig källa i sin bransch",
      ],
      en: [
        "Businesses whose customers often search with questions like “how” and “how much”",
        "Businesses with an existing website that rarely appear in featured answers",
        "Service businesses that want to be seen as a knowledgeable source in their field",
      ],
      ar: [
        "الشركات التي يبحث عملاؤها غالبًا بأسئلة مثل «كيف» و«كم التكلفة»",
        "الشركات التي تملك موقعًا لكنها نادرًا ما تظهر في الإجابات المميزة",
        "شركات الخدمات الراغبة في الظهور كمصدر موثوق في مجالها",
      ],
    },
    whatsIncluded: {
      sv: [
        "Kartläggning av de frågor dina kunder ställer",
        "Innehåll som ger direkta, korta svar följt av fördjupning",
        "FAQ-sektioner och strukturerad data (schema.org) på rätt sidor",
        "Uppföljning av synlighet i utvalda svar och ”Andra frågar också”",
      ],
      en: [
        "Mapping the questions your customers ask",
        "Content that gives direct, short answers followed by detail",
        "FAQ sections and structured data (schema.org) on the right pages",
        "Tracking visibility in featured snippets and “People also ask”",
      ],
      ar: [
        "حصر الأسئلة التي يطرحها عملاؤك",
        "محتوى يقدم إجابات مباشرة وقصيرة يليها التفصيل",
        "أقسام للأسئلة الشائعة وبيانات منظمة (schema.org) في الصفحات المناسبة",
        "متابعة الظهور في المقتطفات المميزة وقسم «أسئلة ذات صلة»",
      ],
    },
    process: {
      sv: [
        "Vi samlar in frågor från sökdata, kundkontakter och konkurrenter",
        "Vi väljer ut de frågor som är mest värdefulla för ditt företag",
        "Vi skriver eller omarbetar innehåll och lägger till strukturerad data",
        "Vi följer upp var du syns och bygger vidare på det som fungerar",
      ],
      en: [
        "We gather questions from search data, customer contacts, and competitors",
        "We select the questions that are most valuable for your business",
        "We write or rework content and add structured data",
        "We track where you appear and build on what works",
      ],
      ar: [
        "نجمع الأسئلة من بيانات البحث وتواصل العملاء والمنافسين",
        "نختار الأسئلة الأكثر قيمة لشركتك",
        "نكتب المحتوى أو نعيد صياغته ونضيف البيانات المنظمة",
        "نتابع أماكن ظهورك ونبني على ما ينجح",
      ],
    },
    whatToPrepare: {
      sv: [
        "Vanliga frågor du får från kunder via telefon, mejl eller sociala medier",
        "Tillgång till webbplatsens administration",
        "Tillgång till Google Search Console, om det finns",
      ],
      en: [
        "Common questions you get from customers by phone, email, or social media",
        "Access to your website's admin panel",
        "Access to Google Search Console, if set up",
      ],
      ar: [
        "الأسئلة الشائعة التي تصلك من العملاء عبر الهاتف أو البريد أو وسائل التواصل",
        "صلاحية الوصول إلى لوحة إدارة الموقع",
        "صلاحية الوصول إلى Google Search Console إن وُجد",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Från sökresultat till direkta svar",
        },
        {
          type: "paragraph",
          text: "Allt fler sökningar besvaras direkt i sökresultatet eller av en röstassistent, utan att användaren klickar vidare. AEO handlar om att se till att det är ditt företags information som används som svar — korrekt, aktuell och med ditt namn som källa.",
        },
        {
          type: "heading",
          level: 2,
          text: "Byggt på samma grund som SEO",
        },
        {
          type: "paragraph",
          text: "AEO ersätter inte traditionell sökmotoroptimering utan bygger vidare på den. En tekniskt sund webbplats med trovärdigt innehåll är förutsättningen; AEO lägger till struktur och tydlighet som gör innehållet lätt att citera.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.sv },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "From search results to direct answers",
        },
        {
          type: "paragraph",
          text: "More and more searches are answered directly in the results page or by a voice assistant, without the user clicking through. AEO is about making sure it's your business's information being used as the answer — accurate, up to date, and with your name as the source.",
        },
        {
          type: "heading",
          level: 2,
          text: "Built on the same foundation as SEO",
        },
        {
          type: "paragraph",
          text: "AEO doesn't replace traditional search engine optimization — it builds on it. A technically sound website with credible content is the prerequisite; AEO adds the structure and clarity that make that content easy to quote.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.en },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "من نتائج البحث إلى الإجابات المباشرة",
        },
        {
          type: "paragraph",
          text: "باتت عمليات بحث كثيرة تُجاب مباشرة في صفحة النتائج أو عبر مساعد صوتي، دون أن ينقر المستخدم على أي رابط. ويهدف تحسين محركات الإجابة إلى أن تكون معلومات شركتك هي المستخدمة في الإجابة — دقيقة ومحدّثة واسمك هو المصدر.",
        },
        {
          type: "heading",
          level: 2,
          text: "مبني على أساس تحسين محركات البحث نفسه",
        },
        {
          type: "paragraph",
          text: "لا يحل تحسين محركات الإجابة محل تحسين محركات البحث التقليدي، بل يبني عليه. فالموقع السليم تقنيًا ذو المحتوى الموثوق هو الأساس، ويضيف AEO الهيكلة والوضوح اللذين يجعلان المحتوى سهل الاقتباس.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-aeo-what"],
    lastReviewed: LAST_REVIEWED,
  },

  geo: {
    key: "geo",
    order: 18,
    slug: {
      sv: "geo-ai-sok",
      en: "generative-engine-optimization",
      ar: "الظهور-في-بحث-الذكاء-الاصطناعي",
    },
    name: {
      sv: "GEO – synlighet i AI-sök",
      en: "Generative engine optimization (GEO)",
      ar: "تحسين الظهور في محركات الذكاء الاصطناعي (GEO)",
    },
    summary: {
      sv: "GEO, Generative Engine Optimization, hjälper ditt företag att nämnas och rekommenderas när kunder frågar AI-tjänster som ChatGPT, Gemini, Perplexity eller Googles AI-översikter. Vi stärker hur ditt företag beskrivs på webben — på din egen sajt och i externa källor — så att AI-modellerna har korrekt och tydlig information att utgå från.",
      en: "GEO, generative engine optimization, helps your business get mentioned and recommended when customers ask AI tools such as ChatGPT, Gemini, Perplexity, or Google's AI Overviews. We strengthen how your business is described across the web — on your own site and in external sources — so AI models have accurate, clear information to draw on.",
      ar: "يساعد تحسين الظهور في محركات الذكاء الاصطناعي (GEO) على ذكر شركتك والتوصية بها عندما يسأل العملاء أدوات مثل ChatGPT وGemini وPerplexity أو ملخصات جوجل المدعومة بالذكاء الاصطناعي. نعزز طريقة وصف شركتك على الإنترنت — في موقعك وفي المصادر الخارجية — لتجد نماذج الذكاء الاصطناعي معلومات دقيقة وواضحة تستند إليها.",
    },
    teaser: {
      sv: "Bli nämnd när kunder frågar ChatGPT, Gemini och andra AI-tjänster.",
      en: "Get mentioned when customers ask ChatGPT, Gemini and other AI tools.",
      ar: "احرص على ذكر شركتك عندما يسأل العملاء ChatGPT وGemini وغيرها.",
    },
    whoItsFor: {
      sv: [
        "Företag som vill synas när kunder ber AI om rekommendationer",
        "Företag som upptäckt att AI-tjänster beskriver dem felaktigt eller inte alls",
        "Företag som vill ligga steget före i hur kunder söker information",
      ],
      en: [
        "Businesses that want to appear when customers ask AI for recommendations",
        "Businesses that find AI tools describe them inaccurately, or not at all",
        "Businesses that want to stay ahead of how customers search for information",
      ],
      ar: [
        "الشركات الراغبة في الظهور عندما يطلب العملاء توصيات من الذكاء الاصطناعي",
        "الشركات التي تصفها أدوات الذكاء الاصطناعي بشكل خاطئ أو لا تذكرها أصلًا",
        "الشركات الراغبة في مواكبة الطريقة الجديدة التي يبحث بها العملاء",
      ],
    },
    whatsIncluded: {
      sv: [
        "Kartläggning av hur AI-tjänster beskriver ditt företag och din bransch idag",
        "Tydlig företagsinformation, strukturerad data och llms.txt på din webbplats",
        "Enhetliga uppgifter i kataloger, profiler och andra källor AI hämtar från",
        "Innehåll med fakta, källor och tydliga påståenden som är lätta att citera",
      ],
      en: [
        "Mapping how AI tools describe your business and industry today",
        "Clear business information, structured data, and llms.txt on your website",
        "Consistent details in directories, profiles, and other sources AI draws from",
        "Content with facts, sources, and clear statements that are easy to cite",
      ],
      ar: [
        "رصد الطريقة التي تصف بها أدوات الذكاء الاصطناعي شركتك ومجالك حاليًا",
        "معلومات واضحة عن الشركة وبيانات منظمة وملف llms.txt على موقعك",
        "توحيد بياناتك في الأدلة والملفات التعريفية والمصادر التي يعتمد عليها الذكاء الاصطناعي",
        "محتوى يتضمن حقائق ومصادر وعبارات واضحة يسهل الاستشهاد بها",
      ],
    },
    process: {
      sv: [
        "Vi testar hur olika AI-tjänster svarar på frågor om din bransch och ditt företag",
        "Vi identifierar luckor och felaktigheter i den information som finns",
        "Vi förbättrar din webbplats och dina externa profiler",
        "Vi upprepar testerna regelbundet och följer utvecklingen över tid",
      ],
      en: [
        "We test how different AI tools answer questions about your industry and business",
        "We identify gaps and inaccuracies in the information available",
        "We improve your website and your external profiles",
        "We repeat the tests regularly and track progress over time",
      ],
      ar: [
        "نختبر كيف تجيب أدوات الذكاء الاصطناعي المختلفة عن أسئلة تخص مجالك وشركتك",
        "نحدد الثغرات والأخطاء في المعلومات المتاحة",
        "نحسّن موقعك وملفاتك التعريفية الخارجية",
        "نكرر الاختبارات بانتظام ونتابع التطور مع الوقت",
      ],
    },
    whatToPrepare: {
      sv: [
        "Korrekta grunduppgifter om företaget: tjänster, orter, kontaktvägar",
        "En lista över profiler och kataloger där företaget redan finns",
        "Tillgång till webbplatsens administration",
      ],
      en: [
        "Accurate basic company details: services, locations, contact methods",
        "A list of profiles and directories where your business is already listed",
        "Access to your website's admin panel",
      ],
      ar: [
        "بيانات أساسية دقيقة عن الشركة: الخدمات والمدن وطرق التواصل",
        "قائمة بالملفات التعريفية والأدلة التي تظهر فيها شركتك حاليًا",
        "صلاحية الوصول إلى لوحة إدارة الموقع",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Kunderna frågar AI — vad svarar den om dig?",
        },
        {
          type: "paragraph",
          text: "Många använder i dag AI-assistenter för att jämföra leverantörer och få rekommendationer. Svaren bygger på den information som finns om ditt företag på webben. Är den sparsam, spretig eller inaktuell riskerar ditt företag att utelämnas eller beskrivas fel.",
        },
        {
          type: "heading",
          level: 2,
          text: "Ett område under snabb utveckling",
        },
        {
          type: "paragraph",
          text: "AI-sök förändras snabbt, och tjänsterna fungerar olika. Vi fokuserar därför på det som håller oavsett plattform: korrekt, konsekvent och välstrukturerad information om ditt företag, publicerad där AI-tjänsterna hämtar sin kunskap.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.sv },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Customers are asking AI — what does it say about you?",
        },
        {
          type: "paragraph",
          text: "Many people now use AI assistants to compare providers and get recommendations. The answers are based on the information available about your business online. If it's sparse, inconsistent, or out of date, your business risks being left out or described incorrectly.",
        },
        {
          type: "heading",
          level: 2,
          text: "A fast-moving field",
        },
        {
          type: "paragraph",
          text: "AI search is changing quickly, and each tool works differently. So we focus on what holds up regardless of platform: accurate, consistent, well-structured information about your business, published where AI tools get their knowledge.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.en },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "العملاء يسألون الذكاء الاصطناعي — فماذا يقول عنك؟",
        },
        {
          type: "paragraph",
          text: "يستخدم كثيرون اليوم مساعدات الذكاء الاصطناعي لمقارنة مقدمي الخدمات والحصول على توصيات. وتعتمد الإجابات على المعلومات المتاحة عن شركتك على الإنترنت، فإذا كانت قليلة أو متضاربة أو قديمة، فقد تُستبعد شركتك أو تُوصف بشكل خاطئ.",
        },
        {
          type: "heading",
          level: 2,
          text: "مجال سريع التطور",
        },
        {
          type: "paragraph",
          text: "يتغير البحث بالذكاء الاصطناعي بسرعة، وتعمل كل أداة بطريقة مختلفة. لذلك نركز على ما يبقى صالحًا أيًا كانت المنصة: معلومات دقيقة ومتسقة ومنظمة عن شركتك، منشورة في الأماكن التي تستقي منها أدوات الذكاء الاصطناعي معرفتها.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-geo-what", "faq-geo-vs-seo"],
    lastReviewed: LAST_REVIEWED,
  },

  "social-media-ads": {
    key: "social-media-ads",
    order: 19,
    slug: {
      sv: "annonsering-sociala-medier",
      en: "social-media-ads",
      ar: "إعلانات-وسائل-التواصل",
    },
    name: {
      sv: "Annonsering i sociala medier",
      en: "Social media advertising",
      ar: "إعلانات وسائل التواصل الاجتماعي",
    },
    summary: {
      sv: "Vi planerar, skapar och driver annonskampanjer på Facebook, Instagram, TikTok och LinkedIn för små och medelstora företag. Annonserna riktas mot rätt målgrupp, på rätt språk och i rätt område, och vi följer upp vad varje krona ger — med mätning som visar förfrågningar och försäljning, inte bara visningar.",
      en: "We plan, create, and run ad campaigns on Facebook, Instagram, TikTok, and LinkedIn for small and medium-sized businesses. Ads are targeted at the right audience, in the right language and area, and we follow up on what every krona delivers — with tracking that shows enquiries and sales, not just impressions.",
      ar: "نخطط لحملات إعلانية على فيسبوك وإنستغرام وتيك توك ولينكدإن وننشئها ونديرها للشركات الصغيرة والمتوسطة. نوجّه الإعلانات إلى الجمهور المناسب باللغة والمنطقة المناسبتين، ونتابع العائد من كل كرونة — بقياس يُظهر الاستفسارات والمبيعات لا مجرد مرات الظهور.",
    },
    teaser: {
      sv: "Annonser på Facebook, Instagram, TikTok och LinkedIn — med tydlig uppföljning.",
      en: "Ads on Facebook, Instagram, TikTok and LinkedIn — with clear tracking.",
      ar: "إعلانات على فيسبوك وإنستغرام وتيك توك ولينكدإن مع متابعة واضحة.",
    },
    whoItsFor: {
      sv: [
        "Företag som vill nå nya kunder snabbt inom ett visst område",
        "Företag med kampanjer, erbjudanden eller nyöppningar att marknadsföra",
        "Företag som annonserar själva i dag men är osäkra på vad det ger",
      ],
      en: [
        "Businesses that want to reach new customers quickly in a specific area",
        "Businesses with campaigns, offers, or openings to promote",
        "Businesses that advertise on their own today but are unsure what it delivers",
      ],
      ar: [
        "الشركات الراغبة في الوصول إلى عملاء جدد بسرعة في منطقة محددة",
        "الشركات التي لديها حملات أو عروض أو افتتاحات تريد الترويج لها",
        "الشركات التي تعلن بنفسها حاليًا لكنها غير متأكدة من العائد",
      ],
    },
    whatsIncluded: {
      sv: [
        "Kampanjstrategi, målgrupper och budgetförslag",
        "Annonstexter och bild- eller videomaterial på ett eller flera språk",
        "Installation av Meta-pixel, konverteringsspårning och målgrupper",
        "Löpande optimering, A/B-tester och månatlig rapportering",
      ],
      en: [
        "Campaign strategy, audiences, and a budget proposal",
        "Ad copy and image or video creative in one or more languages",
        "Setup of the Meta pixel, conversion tracking, and audiences",
        "Ongoing optimization, A/B testing, and monthly reporting",
      ],
      ar: [
        "استراتيجية الحملة والجمهور المستهدف ومقترح الميزانية",
        "نصوص إعلانية ومواد مصورة أو فيديو بلغة واحدة أو أكثر",
        "إعداد بيكسل ميتا وتتبع التحويلات والجماهير",
        "تحسين مستمر واختبارات A/B وتقارير شهرية",
      ],
    },
    process: {
      sv: [
        "Vi går igenom dina mål, din målgrupp och din budget",
        "Vi sätter upp spårning och tar fram annonsmaterial för godkännande",
        "Vi lanserar kampanjerna och optimerar dem löpande",
        "Du får regelbundna rapporter med resultat och rekommendationer",
      ],
      en: [
        "We go through your goals, audience, and budget",
        "We set up tracking and prepare ad creative for your approval",
        "We launch the campaigns and optimize them continuously",
        "You receive regular reports with results and recommendations",
      ],
      ar: [
        "نراجع أهدافك وجمهورك وميزانيتك",
        "نعدّ أدوات التتبع ونجهز المواد الإعلانية لموافقتك",
        "نطلق الحملات ونحسّنها باستمرار",
        "تحصل على تقارير منتظمة بالنتائج والتوصيات",
      ],
    },
    whatToPrepare: {
      sv: [
        "Tillgång till din Facebook-sida, Instagramkonto och Meta Business-konto",
        "Bilder, videor och logotyp som får användas i annonser",
        "En ungefärlig månadsbudget för annonsering",
      ],
      en: [
        "Access to your Facebook page, Instagram account, and Meta Business account",
        "Images, videos, and a logo that may be used in ads",
        "An approximate monthly advertising budget",
      ],
      ar: [
        "صلاحية الوصول إلى صفحة فيسبوك وحساب إنستغرام وحساب Meta Business",
        "صور وفيديوهات وشعار يمكن استخدامها في الإعلانات",
        "ميزانية شهرية تقريبية للإعلانات",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Rätt budskap till rätt personer",
        },
        {
          type: "paragraph",
          text: "Sociala medier gör det möjligt att nå kunder utifrån område, intressen, språk och beteende. Det gör annonseringen kraftfull men också lätt att slösa pengar på om uppsättningen inte är genomtänkt. Vi börjar därför alltid med mål och mätning innan en enda annons publiceras.",
        },
        {
          type: "heading",
          level: 2,
          text: "Annonser på flera språk",
        },
        {
          type: "paragraph",
          text: "Riktar du dig till både svensk- och arabisktalande kunder kan vi ta fram annonser på båda språken och följa upp vilken målgrupp som ger bäst resultat.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.sv },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "The right message to the right people",
        },
        {
          type: "paragraph",
          text: "Social media lets you reach customers based on location, interests, language, and behavior. That makes advertising powerful — but also easy to waste money on if the setup isn't well thought out. So we always start with goals and tracking before a single ad goes live.",
        },
        {
          type: "heading",
          level: 2,
          text: "Ads in several languages",
        },
        {
          type: "paragraph",
          text: "If you target both Swedish- and Arabic-speaking customers, we can create ads in both languages and track which audience delivers the best results.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.en },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "الرسالة المناسبة للأشخاص المناسبين",
        },
        {
          type: "paragraph",
          text: "تتيح وسائل التواصل الاجتماعي الوصول إلى العملاء حسب الموقع والاهتمامات واللغة والسلوك. وهذا يجعل الإعلان فعالًا، لكنه قد يهدر المال بسهولة إذا لم يُعدّ بعناية. لذلك نبدأ دائمًا بتحديد الأهداف وأدوات القياس قبل نشر أي إعلان.",
        },
        {
          type: "heading",
          level: 2,
          text: "إعلانات بعدة لغات",
        },
        {
          type: "paragraph",
          text: "إذا كنت تستهدف عملاء ناطقين بالسويدية والعربية معًا، يمكننا إعداد إعلانات باللغتين ومتابعة أي جمهور يحقق أفضل النتائج.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-social-ads-platforms", "faq-ads-budget"],
    lastReviewed: LAST_REVIEWED,
  },

  "google-ads": {
    key: "google-ads",
    order: 20,
    slug: {
      sv: "google-ads",
      en: "google-ads",
      ar: "إعلانات-جوجل",
    },
    name: {
      sv: "Google Ads",
      en: "Google Ads",
      ar: "إعلانات جوجل (Google Ads)",
    },
    summary: {
      sv: "Med Google Ads syns ditt företag högst upp när kunder aktivt söker efter det du erbjuder. Vi sätter upp och driver sökannonser, Performance Max, YouTube- och displaykampanjer med noggrann sökordsstyrning och konverteringsspårning, så att budgeten går till klick som faktiskt kan bli kunder — och du ser vad varje förfrågan kostar.",
      en: "With Google Ads, your business appears at the top when customers are actively searching for what you offer. We set up and run search ads, Performance Max, YouTube, and display campaigns with careful keyword control and conversion tracking, so your budget goes to clicks that can actually become customers — and you can see what each enquiry costs.",
      ar: "مع إعلانات جوجل تظهر شركتك في أعلى النتائج عندما يبحث العملاء فعليًا عمّا تقدمه. نُعدّ ونُدير إعلانات البحث وحملات Performance Max ويوتيوب والإعلانات المصورة مع ضبط دقيق للكلمات المفتاحية وتتبع التحويلات، لتذهب ميزانيتك إلى نقرات يمكن أن تتحول إلى عملاء — وترى تكلفة كل استفسار.",
    },
    teaser: {
      sv: "Sökannonser och kampanjer som når kunder när de aktivt söker.",
      en: "Search ads and campaigns that reach customers while they're actively searching.",
      ar: "إعلانات بحث وحملات تصل إلى العملاء أثناء بحثهم الفعلي.",
    },
    whoItsFor: {
      sv: [
        "Företag vars kunder söker efter tjänsten när de behöver den, som hantverkare och konsulter",
        "Företag som vill ha förfrågningar snabbt medan SEO-arbetet tar fart",
        "Företag med befintliga kampanjer som vill ha en oberoende genomgång",
      ],
      en: [
        "Businesses whose customers search when they need the service, such as trades and consultants",
        "Businesses that want enquiries quickly while SEO work gets going",
        "Businesses with existing campaigns that want an independent review",
      ],
      ar: [
        "الشركات التي يبحث عملاؤها عن الخدمة وقت الحاجة إليها، مثل الحرفيين والاستشاريين",
        "الشركات الراغبة في الحصول على استفسارات بسرعة ريثما يؤتي تحسين محركات البحث ثماره",
        "الشركات التي لديها حملات قائمة وترغب في مراجعة مستقلة لها",
      ],
    },
    whatsIncluded: {
      sv: [
        "Sökordsanalys, kontostruktur och budgetförslag",
        "Annonstexter, tillägg och vid behov anpassade landningssidor",
        "Konverteringsspårning via Google Tag Manager och Google Analytics 4",
        "Löpande optimering av bud, sökord och negativa sökord samt rapportering",
      ],
      en: [
        "Keyword research, account structure, and a budget proposal",
        "Ad copy, assets, and tailored landing pages where needed",
        "Conversion tracking via Google Tag Manager and Google Analytics 4",
        "Ongoing optimization of bids, keywords, and negative keywords, plus reporting",
      ],
      ar: [
        "تحليل الكلمات المفتاحية وهيكلة الحساب ومقترح الميزانية",
        "نصوص إعلانية وإضافات وصفحات هبوط مخصصة عند الحاجة",
        "تتبع التحويلات عبر Google Tag Manager وGoogle Analytics 4",
        "تحسين مستمر للمزايدات والكلمات المفتاحية والكلمات السلبية مع تقارير دورية",
      ],
    },
    process: {
      sv: [
        "Vi analyserar marknaden, sökvolymer och konkurrenternas annonsering",
        "Vi bygger kontot och sätter upp spårning av samtal, formulär och köp",
        "Vi lanserar kampanjerna och justerar dem tätt de första veckorna",
        "Vi följer upp kostnad per förfrågan och föreslår nästa steg",
      ],
      en: [
        "We analyze the market, search volumes, and competitors' advertising",
        "We build the account and set up tracking of calls, forms, and purchases",
        "We launch the campaigns and adjust them closely in the first weeks",
        "We follow up on cost per enquiry and suggest next steps",
      ],
      ar: [
        "نحلل السوق وأحجام البحث وإعلانات المنافسين",
        "نبني الحساب ونُعدّ تتبع المكالمات والنماذج وعمليات الشراء",
        "نطلق الحملات ونتابعها عن قرب خلال الأسابيع الأولى",
        "نتابع تكلفة كل استفسار ونقترح الخطوات التالية",
      ],
    },
    whatToPrepare: {
      sv: [
        "Tillgång till befintligt Google Ads-konto, om det finns",
        "Tillgång till webbplatsen eller Google Tag Manager",
        "Information om vilka tjänster och områden som är mest lönsamma",
      ],
      en: [
        "Access to your existing Google Ads account, if you have one",
        "Access to your website or Google Tag Manager",
        "Information on which services and areas are most profitable",
      ],
      ar: [
        "صلاحية الوصول إلى حساب Google Ads الحالي إن وُجد",
        "صلاحية الوصول إلى الموقع أو Google Tag Manager",
        "معلومات عن الخدمات والمناطق الأكثر ربحية",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Syns när kunden letar",
        },
        {
          type: "paragraph",
          text: "Sökannonser når människor i det ögonblick de letar efter en lösning. Det gör Google Ads till en av de mest direkta vägarna till nya förfrågningar — förutsatt att kontot är rätt uppsatt, att sökorden matchar köpintentionen och att irrelevanta sökningar filtreras bort.",
        },
        {
          type: "heading",
          level: 2,
          text: "Marknadsföring med ekonomisk kontroll",
        },
        {
          type: "paragraph",
          text: "Vi redovisar annonskostnader och resultat så att du kan jämföra dem med intäkterna i din bokföring. Det ger ett säkrare underlag för att avgöra om budgeten ska höjas, sänkas eller flyttas.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.sv },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Be visible when customers are looking",
        },
        {
          type: "paragraph",
          text: "Search ads reach people at the exact moment they're looking for a solution. That makes Google Ads one of the most direct routes to new enquiries — provided the account is set up correctly, keywords match purchase intent, and irrelevant searches are filtered out.",
        },
        {
          type: "heading",
          level: 2,
          text: "Marketing with financial control",
        },
        {
          type: "paragraph",
          text: "We report ad spend and results so you can compare them with the revenue in your bookkeeping. That gives you a sounder basis for deciding whether to raise, lower, or reallocate the budget.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.en },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "اظهر عندما يبحث العميل",
        },
        {
          type: "paragraph",
          text: "تصل إعلانات البحث إلى الناس في اللحظة التي يبحثون فيها عن حل. وهذا يجعل إعلانات جوجل من أقصر الطرق إلى استفسارات جديدة — شرط أن يكون الحساب معدًّا بشكل صحيح، وأن تطابق الكلمات المفتاحية نية الشراء، وأن تُستبعد عمليات البحث غير المرتبطة.",
        },
        {
          type: "heading",
          level: 2,
          text: "تسويق تحت رقابة مالية",
        },
        {
          type: "paragraph",
          text: "نعرض تكاليف الإعلانات ونتائجها بحيث يمكنك مقارنتها بالإيرادات في محاسبتك، ما يمنحك أساسًا أمتن لتقرر ما إذا كنت سترفع الميزانية أو تخفضها أو تعيد توزيعها.",
        },
        { type: "disclaimer", text: MARKETING_RESULTS_DISCLAIMER.ar },
      ],
    },
    faqIds: ["faq-ads-budget", "faq-seo-vs-ads"],
    lastReviewed: LAST_REVIEWED,
  },

  "social-media-management": {
    key: "social-media-management",
    order: 21,
    slug: {
      sv: "sociala-medier",
      en: "social-media-management",
      ar: "إدارة-وسائل-التواصل",
    },
    name: {
      sv: "Hantering av sociala medier",
      en: "Social media management",
      ar: "إدارة وسائل التواصل الاجتماعي",
    },
    summary: {
      sv: "Vi hjälper dig att hålla företagets sociala medier aktiva och professionella — från innehållsplan och inlägg till bilder, korta videor och uppföljning. Innehållet kan tas fram på svenska, engelska och arabiska, så att du når alla dina kundgrupper med en enhetlig ton, utan att det tar tid från din kärnverksamhet.",
      en: "We help you keep your company's social media active and professional — from a content plan and posts to images, short videos, and follow-up. Content can be produced in Swedish, English, and Arabic, so you reach all your customer groups with a consistent voice, without it taking time away from your core business.",
      ar: "نساعدك على إبقاء حسابات شركتك على وسائل التواصل الاجتماعي نشطة واحترافية — من خطة المحتوى والمنشورات إلى الصور والفيديوهات القصيرة والمتابعة. يمكن إعداد المحتوى بالسويدية والإنجليزية والعربية، لتصل إلى جميع فئات عملائك بأسلوب موحد، دون أن يأخذ ذلك من وقت عملك الأساسي.",
    },
    teaser: {
      sv: "Innehåll och inlägg på svenska, engelska och arabiska.",
      en: "Content and posts in Swedish, English and Arabic.",
      ar: "محتوى ومنشورات بالسويدية والإنجليزية والعربية.",
    },
    whoItsFor: {
      sv: [
        "Företag som har konton men sällan hinner publicera",
        "Företag som vill bygga förtroende och synas regelbundet",
        "Företag som vill kommunicera med kunder på flera språk",
      ],
      en: [
        "Businesses with accounts but rarely time to post",
        "Businesses that want to build trust and stay visible regularly",
        "Businesses that want to communicate with customers in several languages",
      ],
      ar: [
        "الشركات التي لديها حسابات لكنها نادرًا ما تجد وقتًا للنشر",
        "الشركات الراغبة في بناء الثقة والظهور بانتظام",
        "الشركات الراغبة في التواصل مع العملاء بعدة لغات",
      ],
    },
    whatsIncluded: {
      sv: [
        "Innehållsplan per månad utifrån dina mål och säsonger",
        "Texter, bilder och korta videor anpassade för varje kanal",
        "Schemaläggning och publicering på Facebook, Instagram och LinkedIn",
        "Uppföljning av räckvidd och engagemang med förslag på förbättringar",
      ],
      en: [
        "A monthly content plan based on your goals and seasons",
        "Copy, images, and short videos tailored to each channel",
        "Scheduling and publishing on Facebook, Instagram, and LinkedIn",
        "Tracking of reach and engagement with suggestions for improvement",
      ],
      ar: [
        "خطة محتوى شهرية مبنية على أهدافك والمواسم",
        "نصوص وصور وفيديوهات قصيرة مناسبة لكل منصة",
        "جدولة المنشورات ونشرها على فيسبوك وإنستغرام ولينكدإن",
        "متابعة الوصول والتفاعل مع اقتراحات للتحسين",
      ],
    },
    process: {
      sv: [
        "Vi går igenom ditt varumärke, dina kanaler och dina mål",
        "Vi tar fram en innehållsplan som du godkänner",
        "Vi skapar och publicerar innehållet enligt planen",
        "Vi följer upp resultaten och justerar planen månad för månad",
      ],
      en: [
        "We go through your brand, your channels, and your goals",
        "We create a content plan for your approval",
        "We produce and publish the content according to the plan",
        "We review the results and adjust the plan month by month",
      ],
      ar: [
        "نراجع علامتك التجارية ومنصاتك وأهدافك",
        "نعدّ خطة محتوى لموافقتك",
        "ننشئ المحتوى وننشره وفق الخطة",
        "نراجع النتائج ونعدّل الخطة شهريًا",
      ],
    },
    whatToPrepare: {
      sv: [
        "Tillgång till företagets konton i sociala medier",
        "Logotyp, färger och bilder från verksamheten",
        "Kommande kampanjer, händelser eller nyheter du vill lyfta",
      ],
      en: [
        "Access to your company's social media accounts",
        "Your logo, colors, and photos from the business",
        "Upcoming campaigns, events, or news you want to highlight",
      ],
      ar: [
        "صلاحية الوصول إلى حسابات الشركة على وسائل التواصل",
        "الشعار والألوان وصور من نشاطك التجاري",
        "الحملات أو الفعاليات أو الأخبار القادمة التي تريد إبرازها",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Regelbundenhet bygger förtroende",
        },
        {
          type: "paragraph",
          text: "Många kunder kollar ett företags sociala medier innan de tar kontakt. Ett konto som uppdateras regelbundet med relevant innehåll signalerar att verksamheten är aktiv och seriös — även om kunden aldrig klickar på en annons.",
        },
        {
          type: "heading",
          level: 2,
          text: "Organiskt och betalt tillsammans",
        },
        {
          type: "paragraph",
          text: "Organiskt innehåll och annonsering fungerar bäst tillsammans. Innehåll som fungerar bra organiskt kan förstärkas med annonsbudget, och vi kan samordna båda om du även anlitar oss för annonsering i sociala medier.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Consistency builds trust",
        },
        {
          type: "paragraph",
          text: "Many customers check a company's social media before getting in touch. An account that's regularly updated with relevant content signals that the business is active and serious — even if the customer never clicks on an ad.",
        },
        {
          type: "heading",
          level: 2,
          text: "Organic and paid together",
        },
        {
          type: "paragraph",
          text: "Organic content and advertising work best together. Content that performs well organically can be boosted with ad budget, and we can coordinate both if you also use us for social media advertising.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "الانتظام يبني الثقة",
        },
        {
          type: "paragraph",
          text: "يتصفح كثير من العملاء حسابات الشركة على وسائل التواصل قبل التواصل معها. والحساب الذي يُحدَّث بانتظام بمحتوى مفيد يعكس أن النشاط التجاري نشط وجاد — حتى لو لم ينقر العميل على أي إعلان.",
        },
        {
          type: "heading",
          level: 2,
          text: "المحتوى المجاني والمدفوع معًا",
        },
        {
          type: "paragraph",
          text: "يحقق المحتوى المجاني والإعلانات أفضل النتائج عندما يعملان معًا. فالمحتوى الناجح يمكن تعزيزه بميزانية إعلانية، ويمكننا تنسيق الاثنين إذا كنت تستعين بنا أيضًا في إعلانات وسائل التواصل.",
        },
      ],
    },
    faqIds: ["faq-social-management-content"],
    lastReviewed: LAST_REVIEWED,
  },

  "saas-development": {
    key: "saas-development",
    order: 22,
    slug: {
      sv: "saas-utveckling",
      en: "saas-development",
      ar: "تطوير-تطبيقات-الويب",
    },
    name: {
      sv: "SaaS- & webbapputveckling",
      en: "SaaS & web app development",
      ar: "تطوير تطبيقات الويب وSaaS",
    },
    summary: {
      sv: "Vi utvecklar skräddarsydda webbapplikationer och SaaS-produkter — från kundportaler och bokningssystem till interna verktyg och egna mjukvarutjänster med abonnemang. Vi hjälper dig att börja med en fungerande första version, ett så kallat MVP, och bygga vidare utifrån verkliga användares behov, med modern och säker teknik.",
      en: "We develop custom web applications and SaaS products — from customer portals and booking systems to internal tools and your own subscription software. We help you start with a working first version, a so-called MVP, and build on it based on real users' needs, using modern, secure technology.",
      ar: "نطوّر تطبيقات ويب مخصصة ومنتجات برمجية كخدمة (SaaS) — من بوابات العملاء وأنظمة الحجز إلى الأدوات الداخلية وخدماتك البرمجية الخاصة بنظام الاشتراك. نساعدك على البدء بنسخة أولى عاملة (MVP) ثم تطويرها وفق احتياجات المستخدمين الفعلية، باستخدام تقنيات حديثة وآمنة.",
    },
    teaser: {
      sv: "Skräddarsydda webbappar och SaaS-produkter, från första MVP och vidare.",
      en: "Custom web apps and SaaS products, from a first MVP onward.",
      ar: "تطبيقات ويب ومنتجات SaaS مخصصة، من النسخة الأولى (MVP) فصاعدًا.",
    },
    whoItsFor: {
      sv: [
        "Entreprenörer med en idé till en digital tjänst eller SaaS-produkt",
        "Företag som behöver ett eget system i stället för kalkylblad och manuella rutiner",
        "Företag som vill erbjuda sina kunder en portal eller app",
      ],
      en: [
        "Entrepreneurs with an idea for a digital service or SaaS product",
        "Businesses that need their own system instead of spreadsheets and manual routines",
        "Businesses that want to offer their customers a portal or app",
      ],
      ar: [
        "رواد الأعمال الذين لديهم فكرة لخدمة رقمية أو منتج SaaS",
        "الشركات التي تحتاج إلى نظام خاص بدلًا من جداول البيانات والإجراءات اليدوية",
        "الشركات الراغبة في تقديم بوابة أو تطبيق لعملائها",
      ],
    },
    whatsIncluded: {
      sv: [
        "Kravanalys, prioritering av funktioner och avgränsning av första versionen",
        "Design av gränssnitt och användarflöden",
        "Utveckling med inloggning, betalningar, databaser och integrationer",
        "Driftsättning, säkerhet, dokumentation och vidareutveckling",
      ],
      en: [
        "Requirements analysis, feature prioritization, and scoping of the first version",
        "Interface and user-flow design",
        "Development with login, payments, databases, and integrations",
        "Deployment, security, documentation, and further development",
      ],
      ar: [
        "تحليل المتطلبات وترتيب أولويات الميزات وتحديد نطاق النسخة الأولى",
        "تصميم الواجهات ومسارات الاستخدام",
        "التطوير بما يشمل تسجيل الدخول والمدفوعات وقواعد البيانات والتكاملات",
        "النشر والأمان والتوثيق والتطوير المستمر",
      ],
    },
    process: {
      sv: [
        "Vi går igenom idén, målgruppen och vad som måste finnas i första versionen",
        "Du får en avgränsad plan med prioriterade funktioner och tidsuppskattning",
        "Vi utvecklar i korta etapper och visar löpande vad som byggts",
        "Vi lanserar, samlar in feedback och planerar nästa steg tillsammans",
      ],
      en: [
        "We go through the idea, the audience, and what the first version must include",
        "You receive a scoped plan with prioritized features and a time estimate",
        "We develop in short iterations and show you what's been built along the way",
        "We launch, gather feedback, and plan the next steps together",
      ],
      ar: [
        "نراجع الفكرة والجمهور المستهدف وما يجب أن تتضمنه النسخة الأولى",
        "تحصل على خطة محددة النطاق بميزات مرتبة حسب الأولوية وتقدير زمني",
        "نطوّر على مراحل قصيرة ونعرض عليك ما تم إنجازه أولًا بأول",
        "نطلق المنتج ونجمع الملاحظات ونخطط للخطوات التالية معًا",
      ],
    },
    whatToPrepare: {
      sv: [
        "En beskrivning av problemet tjänsten ska lösa och för vem",
        "Exempel på liknande tjänster du gillar eller vill skilja dig från",
        "Eventuella befintliga system, data eller integrationer som ska kopplas in",
      ],
      en: [
        "A description of the problem the service should solve, and for whom",
        "Examples of similar services you like or want to stand out from",
        "Any existing systems, data, or integrations that need to connect",
      ],
      ar: [
        "وصف للمشكلة التي ستحلها الخدمة ولمن",
        "أمثلة على خدمات مشابهة تعجبك أو تريد التميز عنها",
        "أي أنظمة أو بيانات أو تكاملات قائمة يجب ربطها",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Börja smått, bygg rätt",
        },
        {
          type: "paragraph",
          text: "Det vanligaste misstaget i mjukvaruprojekt är att bygga för mycket innan någon använt produkten. Vi hjälper dig att avgränsa en första version som löser kärnproblemet, så att du kan testa idén på riktiga användare innan du investerar i fler funktioner.",
        },
        {
          type: "heading",
          level: 2,
          text: "Affärsmodellen i fokus",
        },
        {
          type: "paragraph",
          text: "En SaaS-produkt är också ett företag. Eftersom vi även arbetar med redovisning och rådgivning kan vi hjälpa dig att se på prissättning, abonnemangsintäkter, moms på digitala tjänster och budget för utvecklingen, inte bara tekniken.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Start small, build right",
        },
        {
          type: "paragraph",
          text: "The most common mistake in software projects is building too much before anyone has used the product. We help you scope a first version that solves the core problem, so you can test the idea on real users before investing in more features.",
        },
        {
          type: "heading",
          level: 2,
          text: "The business model in focus",
        },
        {
          type: "paragraph",
          text: "A SaaS product is also a business. Since we also work with accounting and advisory, we can help you look at pricing, subscription revenue, VAT on digital services, and the development budget — not just the technology.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "ابدأ صغيرًا وابنِ بشكل صحيح",
        },
        {
          type: "paragraph",
          text: "أكثر الأخطاء شيوعًا في مشاريع البرمجيات هو بناء ميزات كثيرة قبل أن يستخدم أحد المنتج. نساعدك على تحديد نسخة أولى تحل المشكلة الأساسية، لتختبر الفكرة على مستخدمين حقيقيين قبل الاستثمار في مزيد من الميزات.",
        },
        {
          type: "heading",
          level: 2,
          text: "نموذج العمل في صدارة الاهتمام",
        },
        {
          type: "paragraph",
          text: "منتج SaaS هو أيضًا مشروع تجاري. وبما أننا نعمل أيضًا في المحاسبة والاستشارات، يمكننا مساعدتك في التسعير وإيرادات الاشتراكات وضريبة القيمة المضافة على الخدمات الرقمية وميزانية التطوير — لا التقنية فحسب.",
        },
      ],
    },
    faqIds: ["faq-saas-mvp", "faq-saas-ownership"],
    lastReviewed: LAST_REVIEWED,
  },
  "mobile-app-development": {
    key: "mobile-app-development",
    order: 23,
    slug: {
      sv: "apputveckling",
      en: "mobile-app-development",
      ar: "تطوير-تطبيقات-الجوال",
    },
    name: {
      sv: "Apputveckling för iOS & Android",
      en: "Mobile app development",
      ar: "تطوير تطبيقات الجوال",
    },
    summary: {
      sv: "Vi utvecklar mobilappar för iOS och Android — från idé och design till publicering i App Store och Google Play. Oftast bygger vi med en gemensam kodbas för båda plattformarna, vilket håller nere tid och kostnad. Du får en app med inloggning, notiser och betalningar efter behov, och stöd med underhåll och uppdateringar efter lanseringen.",
      en: "We develop mobile apps for iOS and Android — from idea and design to publishing in the App Store and Google Play. We usually build with a shared codebase for both platforms, which keeps time and cost down. You get an app with login, notifications, and payments as needed, plus support with maintenance and updates after launch.",
      ar: "نطوّر تطبيقات الجوال لنظامي iOS وأندرويد — من الفكرة والتصميم إلى النشر في App Store وGoogle Play. وغالبًا ما نعتمد شيفرة برمجية مشتركة للنظامين، ما يقلل الوقت والتكلفة. تحصل على تطبيق يتضمن تسجيل الدخول والإشعارات والمدفوعات حسب الحاجة، مع دعم في الصيانة والتحديثات بعد الإطلاق.",
    },
    teaser: {
      sv: "Mobilappar för iOS och Android — från idé till App Store och Google Play.",
      en: "Mobile apps for iOS and Android — from idea to the App Store and Google Play.",
      ar: "تطبيقات جوال لنظامي iOS وأندرويد — من الفكرة إلى App Store وGoogle Play.",
    },
    whoItsFor: {
      sv: [
        "Företag som vill ge sina kunder en egen app för bokning, beställning eller lojalitet",
        "Entreprenörer med en appidé som behöver en första version att testa",
        "Företag med en webbtjänst som även behöver en mobilapp",
      ],
      en: [
        "Businesses that want to give customers their own app for booking, ordering, or loyalty",
        "Entrepreneurs with an app idea who need a first version to test",
        "Businesses with a web service that also needs a mobile app",
      ],
      ar: [
        "الشركات الراغبة في تقديم تطبيق خاص لعملائها للحجز أو الطلب أو برامج الولاء",
        "رواد الأعمال الذين لديهم فكرة تطبيق ويحتاجون إلى نسخة أولى لاختبارها",
        "الشركات التي لديها خدمة ويب وتحتاج أيضًا إلى تطبيق جوال",
      ],
    },
    whatsIncluded: {
      sv: [
        "Kravanalys, funktionsprioritering och val mellan native- och plattformsoberoende utveckling",
        "UX- och UI-design av skärmar och användarflöden",
        "Utveckling av app och backend med inloggning, pushnotiser, betalningar och integrationer",
        "Publicering i App Store och Google Play samt underhåll och uppdateringar",
      ],
      en: [
        "Requirements analysis, feature prioritization, and the choice between native and cross-platform development",
        "UX and UI design of screens and user flows",
        "App and backend development with login, push notifications, payments, and integrations",
        "Publishing to the App Store and Google Play, plus maintenance and updates",
      ],
      ar: [
        "تحليل المتطلبات وترتيب أولويات الميزات والاختيار بين التطوير الأصلي والتطوير متعدد المنصات",
        "تصميم تجربة وواجهة المستخدم للشاشات ومسارات الاستخدام",
        "تطوير التطبيق والخادم الخلفي مع تسجيل الدخول والإشعارات والمدفوعات والتكاملات",
        "النشر في App Store وGoogle Play مع الصيانة والتحديثات",
      ],
    },
    process: {
      sv: [
        "Vi går igenom idén, målgruppen och vad appen måste kunna i första versionen",
        "Du får skisser och en klickbar prototyp att testa innan utvecklingen börjar",
        "Vi utvecklar i korta etapper och delar testversioner löpande",
        "Vi publicerar appen, följer upp användningen och planerar nästa version",
      ],
      en: [
        "We go through the idea, the audience, and what the app must do in its first version",
        "You receive sketches and a clickable prototype to test before development starts",
        "We develop in short iterations and share test builds along the way",
        "We publish the app, track how it's used, and plan the next version",
      ],
      ar: [
        "نراجع الفكرة والجمهور المستهدف وما يجب أن يقدمه التطبيق في نسخته الأولى",
        "تحصل على رسومات أولية ونموذج تفاعلي لتجربته قبل بدء التطوير",
        "نطوّر على مراحل قصيرة ونشارك معك نسخًا تجريبية أولًا بأول",
        "ننشر التطبيق ونتابع استخدامه ونخطط للنسخة التالية",
      ],
    },
    whatToPrepare: {
      sv: [
        "En beskrivning av vad appen ska göra och för vem",
        "Exempel på appar du gillar eller vill skilja dig från",
        "Logotyp och grafisk profil samt eventuella befintliga system som ska kopplas in",
      ],
      en: [
        "A description of what the app should do, and for whom",
        "Examples of apps you like or want to stand out from",
        "Your logo and brand guidelines, plus any existing systems that need to connect",
      ],
      ar: [
        "وصف لما يجب أن يفعله التطبيق ولمن",
        "أمثلة على تطبيقات تعجبك أو تريد التميز عنها",
        "الشعار والهوية البصرية وأي أنظمة قائمة يجب ربطها",
      ],
    },
    body: {
      sv: [
        {
          type: "heading",
          level: 2,
          text: "Native eller plattformsoberoende?",
        },
        {
          type: "paragraph",
          text: "En native-app byggs separat för iOS och Android, medan en plattformsoberoende app använder en gemensam kodbas för båda. För de flesta företagsappar ger det senare samma upplevelse för användaren till lägre kostnad och med enklare underhåll. Vi rekommenderar lösning utifrån vad just din app behöver.",
        },
        {
          type: "heading",
          level: 2,
          text: "App, webb och affärsmodell i ett",
        },
        {
          type: "paragraph",
          text: "Många appar behöver en webbversion eller en administrationspanel, och vi kan bygga båda tillsammans med vår SaaS- och webbapputveckling. Eftersom vi också arbetar med redovisning kan vi hjälpa dig att se på prissättning, köp i appen, moms och utvecklingsbudget.",
        },
      ],
      en: [
        {
          type: "heading",
          level: 2,
          text: "Native or cross-platform?",
        },
        {
          type: "paragraph",
          text: "A native app is built separately for iOS and Android, while a cross-platform app uses one shared codebase for both. For most business apps, the latter gives users the same experience at a lower cost and with simpler maintenance. We recommend an approach based on what your app actually needs.",
        },
        {
          type: "heading",
          level: 2,
          text: "App, web, and business model together",
        },
        {
          type: "paragraph",
          text: "Many apps need a web version or an admin panel, and we can build both alongside our SaaS and web app development. Since we also work with accounting, we can help you look at pricing, in-app purchases, VAT, and the development budget.",
        },
      ],
      ar: [
        {
          type: "heading",
          level: 2,
          text: "تطبيق أصلي أم متعدد المنصات؟",
        },
        {
          type: "paragraph",
          text: "يُبنى التطبيق الأصلي بشكل منفصل لكل من iOS وأندرويد، بينما يستخدم التطبيق متعدد المنصات شيفرة مشتركة للنظامين. وفي معظم تطبيقات الشركات، يقدّم الخيار الثاني التجربة نفسها للمستخدم بتكلفة أقل وصيانة أسهل. ونوصي بالحل المناسب وفق احتياجات تطبيقك تحديدًا.",
        },
        {
          type: "heading",
          level: 2,
          text: "التطبيق والويب ونموذج العمل معًا",
        },
        {
          type: "paragraph",
          text: "تحتاج تطبيقات كثيرة إلى نسخة ويب أو لوحة إدارة، ويمكننا بناء الاثنين معًا من خلال خدمة تطوير تطبيقات الويب وSaaS. وبما أننا نعمل في المحاسبة أيضًا، يمكننا مساعدتك في التسعير والمشتريات داخل التطبيق وضريبة القيمة المضافة وميزانية التطوير.",
        },
      ],
    },
    faqIds: ["faq-mobile-app-ios-android", "faq-mobile-app-store"],
    lastReviewed: LAST_REVIEWED,
  },
};
