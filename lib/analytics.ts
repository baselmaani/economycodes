/**
 * Google Tag Manager + GA4 wiring. Nothing loads until NEXT_PUBLIC_GTM_ID is
 * set (Vercel env), so local dev and previews stay tracking-free by default.
 * GTM itself decides which events reach GA4 -- see README "Analytics".
 */

const rawGtmId = process.env.NEXT_PUBLIC_GTM_ID?.trim();

/** The container ID, or undefined when unset or malformed. */
export const GTM_ID =
  rawGtmId && /^GTM-[A-Z0-9]+$/.test(rawGtmId) ? rawGtmId : undefined;

/** localStorage key holding the visitor's analytics choice. */
export const CONSENT_STORAGE_KEY = "ec-consent";

/** Window event that reopens the consent banner (Footer "Cookie settings"). */
export const OPEN_CONSENT_EVENT = "ec:open-consent";

export type ConsentChoice = "granted" | "denied";

export type ContactChannel = "phone" | "whatsapp" | "email";

/** Which contact channel a link opens, or null for any other link. */
export function classifyContactHref(href: string): ContactChannel | null {
  const value = href.trim().toLowerCase();
  if (value.startsWith("tel:")) return "phone";
  if (value.startsWith("mailto:")) return "email";
  if (value.startsWith("whatsapp:")) return "whatsapp";
  try {
    const { hostname } = new URL(value);
    if (
      hostname === "wa.me" ||
      hostname === "api.whatsapp.com" ||
      hostname === "web.whatsapp.com" ||
      hostname === "chat.whatsapp.com"
    ) {
      return "whatsapp";
    }
  } catch {
    // Relative or malformed URL: not a contact link.
  }
  return null;
}

/** dataLayer event names, one per channel, as configured in GTM. */
export const contactEventNames: Record<ContactChannel, string> = {
  phone: "phone_click",
  whatsapp: "whatsapp_click",
  email: "email_click",
};

/** Push to GTM's dataLayer. Safe to call before GTM loads or when it never will. */
export function pushDataLayer(
  event: string,
  params: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** Consent Mode v2 update for analytics; ad storage always stays denied. */
export function updateConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const dataLayer = window.dataLayer;
  // gtag() must push the `arguments` object itself: GTM ignores consent
  // commands pushed as a plain array.
  const gtag: Gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  };
  gtag("consent", "update", {
    analytics_storage: choice,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  pushDataLayer("consent_update", { analytics_consent: choice });
}

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function storeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private mode or blocked storage: the choice lasts for this page view.
  }
}

/**
 * Runs inline before GTM: Consent Mode defaults (everything denied), then the
 * stored choice, so a returning visitor who accepted is measured from the
 * first hit. Kept as a string because it must run before any bundle loads.
 */
export const consentDefaultScript = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}`;

export function gtmLoaderScript(id: string) {
  return `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${id}');`;
}
