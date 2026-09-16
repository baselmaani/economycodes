"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function LocaleError({ reset }: { reset: () => void }) {
  const t = useTranslations("error");
  const common = useTranslations("common");

  return (
    <Container
      size="narrow"
      className="flex flex-col items-center gap-4 py-24 text-center"
    >
      <h1 className="text-page-h1 font-semibold text-balance">
        {t("title")}
      </h1>
      <p className="text-muted-foreground text-body">{t("body")}</p>
      <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} size="lg">
          {t("retry")}
        </Button>
        <Button render={<Link href="/kontakt" />} size="lg" variant="outline">
          {common("contactUs")}
        </Button>
      </div>
    </Container>
  );
}
