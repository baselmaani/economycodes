import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { legacyRedirects } from "./config/legacy-redirects";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // No image on this site is ever rendered wider than a phone/small-tablet
    // viewport (the largest `sizes` in use is 100vw on the article grid, and
    // every fixed-width image tops out at 360px) -- trimmed from Next's
    // default deviceSizes (up to 3840px) to match actual usage.
    deviceSizes: [640, 750, 828, 1080],
    // Images uploaded through the admin dashboard's media library.
    remotePatterns: [new URL("https://*.public.blob.vercel-storage.com/**")],
  },
  experimental: {
    // Required because the root layout lives under app/[locale]/layout.tsx
    // (a dynamic segment) -- see app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    return legacyRedirects;
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
