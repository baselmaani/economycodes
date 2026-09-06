import { useTranslations } from "next-intl";

export function SkipLink() {
  const t = useTranslations("common");
  return (
    <a
      href="#main-content"
      className="focus:bg-primary focus:text-primary-foreground sr-only z-50 rounded-md px-4 py-2 focus:not-sr-only focus:fixed focus:start-4 focus:top-4"
    >
      {t("skipToContent")}
    </a>
  );
}
