/**
 * Falls back to the current verified domain. Override with NEXT_PUBLIC_SITE_URL
 * once the final production domain for the rebuilt site is confirmed.
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.economycodes.com";
