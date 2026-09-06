import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import type { AppLocale } from "@/i18n/routing";
import { getLocalized } from "@/lib/i18n-content";
import type { PersonProfile } from "@/content/types";

export function PersonProfileCard({
  person,
  locale,
  learnMoreLabel,
  showLink = true,
  compact = false,
}: {
  person: PersonProfile;
  locale: AppLocale;
  learnMoreLabel?: string;
  showLink?: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col items-start gap-6 sm:flex-row">
      <div className="relative shrink-0">
        <div
          className={`border-border bg-card shadow-md relative overflow-hidden rounded-2xl border ${
            compact ? "w-28" : "w-40"
          }`}
        >
          <Image
            src={person.photo.src}
            alt={getLocalized(person.photo.alt, locale)}
            width={person.photo.width}
            height={person.photo.height}
            sizes={compact ? "112px" : "160px"}
            className="h-auto w-full object-cover"
          />
        </div>
        <span
          aria-hidden="true"
          className="border-primary/40 absolute -end-2 -bottom-2 size-8 rounded-lg border-2"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div>
          <h3 className={compact ? "text-lg font-semibold" : "text-xl font-semibold"}>
            {person.name}
          </h3>
          <p className="text-primary text-sm font-medium">
            {getLocalized(person.title, locale)}
          </p>
        </div>
        <p className="text-muted-foreground text-body max-w-prose">
          {getLocalized(person.bio, locale)}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={person.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-muted-foreground hover:text-primary"
          >
            <FacebookIcon size={18} />
          </a>
          {showLink && learnMoreLabel && (
            <Link
              href="/om-hadi"
              className="text-primary text-sm font-medium hover:underline"
            >
              {learnMoreLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
