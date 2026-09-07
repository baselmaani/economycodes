import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("notFound");
  const common = await getTranslations("common");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-page-h1 font-semibold text-balance">{t("title")}</h1>
      <p className="text-muted-foreground text-body">{t("body")}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button render={<Link href="/" />} size="lg">
          {t("cta")}
        </Button>
        <Button render={<Link href="/kontakt" />} size="lg" variant="outline">
          {common("contactUs")}
        </Button>
      </div>
    </div>
  );
}
