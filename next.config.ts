import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { legacyRedirects } from "./config/legacy-redirects";
import { serviceRedirects } from "./config/service-redirects";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Trimmed from Next's default deviceSizes (up to 3840px) to match actual
    // usage. Most images top out at a phone/small-tablet width; the app
    // screenshots on /bokforingsprogram render up to 720px wide, so 1440
    // keeps their small UI text sharp on 2x screens.
    deviceSizes: [640, 750, 828, 1080, 1440],
    // Images uploaded through the admin dashboard's media library.
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
  experimental: {
    // Required because the root layout lives under app/[locale]/layout.tsx
    // (a dynamic segment) -- see app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    return [...legacyRedirects, ...serviceRedirects];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
