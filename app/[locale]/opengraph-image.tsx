import { ImageResponse } from "next/og";

import { routing } from "@/i18n/routing";
import { alt, contentType, ogCardElement, size } from "@/lib/seo/og-image";

export { alt, contentType, size };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Image() {
  return new ImageResponse(ogCardElement, size);
}
