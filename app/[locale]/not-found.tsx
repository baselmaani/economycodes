import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-page-h1 font-semibold text-balance">{t("title")}</h1>
      <p className="text-muted-foreground text-body">{t("body")}</p>
      <Button render={<Link href="/" />} size="lg" className="mt-2">
        {t("cta")}
      </Button>
    </div>
  );
}
