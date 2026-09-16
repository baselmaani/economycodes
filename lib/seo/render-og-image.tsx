import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { buildBrandedOgCard, size } from "@/lib/seo/og-image";

// Loaded once here (not in lib/seo/og-image.tsx, which buildMetadata() pulls
// into every page's render path) since only the opengraph-image/twitter-image
// routes below actually need the Arabic font.
const notoSansArabicBold = await readFile(
  join(process.cwd(), "assets/fonts/NotoSansArabic-Bold.ttf"),
);

/** Shared ImageResponse wiring for every opengraph-image/twitter-image route. */
export function renderOgImage({
  eyebrow,
  title,
  rtl,
}: {
  eyebrow?: string;
  title: string;
  rtl: boolean;
}) {
  return new ImageResponse(buildBrandedOgCard({ eyebrow, title, rtl }), {
    ...size,
    fonts: rtl
      ? [
          {
            name: "Noto Sans Arabic",
            data: notoSansArabicBold,
            style: "normal",
            weight: 700,
          },
        ]
      : undefined,
  });
}
