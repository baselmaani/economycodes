import type sv from "./messages/sv.json";

type Messages = typeof sv;

declare global {
  // Augments next-intl's message typing so useTranslations()/getTranslations()
  // keys are checked against messages/sv.json (the source of truth shape).
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- documented next-intl typing recipe
  interface IntlMessages extends Messages {}
}
