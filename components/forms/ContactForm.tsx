"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";

import type { AppLocale } from "@/i18n/routing";
import {
  submitContactForm,
  type ContactFormState,
} from "@/app/[locale]/kontakt/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldContent, FieldLabel } from "@/components/ui/field";
import { servicesList } from "@/content/services";
import { getLocalized } from "@/lib/i18n-content";

const initialState: ContactFormState = { status: "idle" };

// text-base below md keeps iOS Safari from zooming in on focus (it zooms on
// any form control under 16px).
const SELECT_CLASS_NAME =
  "border-input bg-background flex h-10 w-full rounded-lg border px-3 py-1 text-base shadow-xs md:text-sm";

export function ContactForm({ locale }: { locale: AppLocale }) {
  const t = useTranslations("form");
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );

  const values = state.values ?? {};
  const errorKey =
    state.message === "rate-limited"
      ? "errorRateLimited"
      : state.message === "invalid"
        ? "errorInvalid"
        : "errorBody";

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="border-border bg-secondary/40 rounded-2xl border p-6 text-center"
      >
        <p className="font-semibold">{t("successTitle")}</p>
        <p className="text-muted-foreground mt-1 text-sm">{t("successBody")}</p>
      </div>
    );
  }

  return (
    // Keyed on the submission count: React resets an uncontrolled form after
    // its action resolves, so remounting re-applies the echoed `values` as
    // defaults and the visitor keeps what they typed when a submission fails.
    <form
      key={state.submission ?? 0}
      action={formAction}
      className="flex flex-col gap-5"
    >
      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from real users, visible to naive bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <Field>
        <FieldLabel htmlFor="name">{t("nameLabel")}</FieldLabel>
        <FieldContent>
          <Input
            id="name"
            name="name"
            required
            maxLength={200}
            autoComplete="name"
            defaultValue={values.name}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="email">{t("emailLabel")}</FieldLabel>
        <FieldContent>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={values.email}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="phone">{t("phoneLabel")}</FieldLabel>
        <FieldContent>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            defaultValue={values.phone}
          />
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="preferredContact">
          {t("preferredContactLabel")}
        </FieldLabel>
        <FieldContent>
          <select
            id="preferredContact"
            name="preferredContact"
            defaultValue={values.preferredContact ?? "email"}
            className={SELECT_CLASS_NAME}
          >
            <option value="email">{t("emailLabel")}</option>
            <option value="phone">{t("phoneLabel")}</option>
          </select>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="service">{t("serviceLabel")}</FieldLabel>
        <FieldContent>
          <select
            id="service"
            name="service"
            defaultValue={values.service ?? ""}
            className={SELECT_CLASS_NAME}
          >
            <option value="" />
            {servicesList.map((service) => (
              <option key={service.key} value={service.key}>
                {getLocalized(service.name, locale)}
              </option>
            ))}
          </select>
        </FieldContent>
      </Field>

      <Field>
        <FieldLabel htmlFor="message">{t("messageLabel")}</FieldLabel>
        <FieldContent>
          <Textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            defaultValue={values.message}
          />
        </FieldContent>
      </Field>

      <Field orientation="horizontal">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          defaultChecked={values.consent}
          className="mt-0.5 size-5 shrink-0"
        />
        <FieldLabel htmlFor="consent" className="text-sm font-normal">
          {t("consentLabel")}
        </FieldLabel>
      </Field>

      {state.status === "error" && (
        <p role="alert" className="text-destructive text-sm">
          {t("errorTitle")} — {t(errorKey)}
        </p>
      )}

      <Button type="submit" disabled={pending} size="lg">
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
