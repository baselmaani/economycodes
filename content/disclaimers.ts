/**
 * Shared, Hadi-vetted legal/tax disclaimer text -- reused verbatim by
 * services (content/services.ts) and articles (content/articles/body/*)
 * rather than restating it, so there is one place to update the wording.
 *
 * Deliberately untyped as `Localized<string>` -- that type makes en/ar
 * optional (string | undefined), but every disclaimer here always provides
 * all three, so plain object-literal inference (all fields required) is
 * used instead, matching how these consts worked before being extracted
 * from content/services.ts.
 */

export const TAX_LEGAL_DISCLAIMER = {
  sv: "Innehållet på den här sidan är allmän information och ersätter inte individuell skatte- eller juridisk rådgivning. Kontakta oss för att gå igenom din specifika situation.",
  en: "The content on this page is general information and does not replace individual tax or legal advice. Contact us to go through your specific situation.",
  ar: "المحتوى في هذه الصفحة معلومات عامة ولا يغني عن استشارة ضريبية أو قانونية فردية. تواصل معنا لمراجعة وضعك الخاص.",
};

export const CONTRACT_DISCLAIMER = {
  sv: "Vår hjälp med avtal och kontrakt är administrativt och praktiskt stöd, inte juridisk representation. Vid behov av kvalificerad juridisk rådgivning hänvisar vi dig vidare till en jurist eller advokat.",
  en: "Our help with agreements and contracts is administrative and practical support, not legal representation. If you need qualified legal advice, we'll refer you to a lawyer or solicitor.",
  ar: "مساعدتنا في العقود والاتفاقيات هي دعم إداري وعملي، وليست تمثيلًا قانونيًا. وعند الحاجة إلى استشارة قانونية متخصصة، سنحيلك إلى محامٍ مختص.",
};

export const INVESTMENT_DISCLAIMER = {
  sv: "Att bilda eller etablera ett företag i Sverige är en separat process från migrationsärenden. Det innebär inget löfte om uppehållstillstånd, medborgarskap eller finansiering. Frågor om uppehållstillstånd hanteras av Migrationsverket.",
  en: "Forming or establishing a company in Sweden is a separate process from immigration matters. It does not imply any promise of a residence permit, citizenship, or financing. Residence permit questions are handled by Migrationsverket.",
  ar: "يُعد تأسيس شركة أو إنشاؤها في السويد عملية منفصلة عن معاملات الهجرة. ولا يعني ذلك أي وعد بالحصول على تصريح إقامة أو الجنسية أو التمويل. وتتولى هيئة الهجرة السويدية (Migrationsverket) البتّ في مسائل تصاريح الإقامة.",
};
