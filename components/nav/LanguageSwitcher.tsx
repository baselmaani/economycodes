"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const localeNames: Record<AppLocale, string> = {
  sv: "Svenska",
  en: "English",
  ar: "العربية",
};

export function LanguageSwitcher() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  function onSelect(nextLocale: AppLocale) {
    router.replace(
      // @ts-expect-error -- next-intl validates params against the resolved pathname at runtime
      { pathname, params },
      { locale: nextLocale },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            aria-label={t("languageLabel")}
            className="gap-1.5"
          />
        }
      >
        <Globe size={16} aria-hidden="true" />
        {localeNames[locale as AppLocale]}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map((code) => (
          <DropdownMenuItem
            key={code}
            onSelect={() => onSelect(code)}
            aria-current={code === locale ? "true" : undefined}
          >
            {localeNames[code]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
