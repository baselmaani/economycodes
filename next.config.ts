import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

import { legacyRedirects } from "./config/legacy-redirects";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Required because the root layout lives under app/[locale]/layout.tsx
    // (a dynamic segment) -- see app/global-not-found.tsx.
    globalNotFound: true,
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default withNextIntl(nextConfig);
