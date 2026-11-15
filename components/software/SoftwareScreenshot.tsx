import Image from "next/image";
import { Expand } from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";
import { softwareCommon } from "@/content/software-pages";
import {
  getSoftwareShot,
  type SoftwareShotId,
} from "@/content/software-screenshots";

/**
 * An app screenshot in a light browser-style frame. The image links to the
 * full-size capture so small text stays readable on a phone.
 */
export function SoftwareScreenshot({
  id,
  locale,
  sizes = "(min-width: 1024px) 640px, 100vw",
  priority = false,
  className,
}: {
  id: SoftwareShotId;
  locale: AppLocale;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const shot = getSoftwareShot(id, locale);
  const caption = getLocalized(softwareCommon.demoData, locale);
  const openLabel = getLocalized(softwareCommon.openFullSize, locale);

  return (
    <figure className={cn("flex flex-col gap-2", className)}>
      <a
        href={shot.src}
        target="_blank"
        rel="noopener"
        aria-label={`${openLabel}: ${shot.alt}`}
        className="group border-border bg-card focus-visible:ring-ring/50 relative block overflow-hidden rounded-2xl border shadow-xl outline-none focus-visible:ring-3"
      >
        <span
          aria-hidden="true"
          className="border-border bg-secondary/60 flex h-7 items-center gap-1.5 border-b px-3"
        >
          <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="size-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          // Next 16 deprecates `priority`; eager + high priority for the hero shot.
          loading={priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : undefined}
          className="h-auto w-full"
        />
        <span
          aria-hidden="true"
          className="bg-brand-navy/85 absolute end-3 bottom-3 flex size-8 items-center justify-center rounded-full text-white opacity-0 shadow transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <Expand size={15} />
        </span>
      </a>
      <figcaption className="text-muted-foreground text-xs">
        {caption}
      </figcaption>
    </figure>
  );
}

/** Placeholder frame for a pending page whose production screenshot isn't taken yet. */
export function SoftwareScreenshotPending({ locale }: { locale: AppLocale }) {
  return (
    <div className="border-border bg-secondary/40 text-muted-foreground flex aspect-[16/10] items-center justify-center rounded-2xl border border-dashed p-6 text-center text-sm">
      {getLocalized(softwareCommon.screenshotPending, locale)}
    </div>
  );
}
