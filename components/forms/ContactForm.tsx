"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  ChevronDown,
  Loader2,
  Mail,
  Phone,
  Send,
} from "lucide-react";

import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import {
  submitContactForm,
  type ContactFieldErrors,
  type ContactFormState,
} from "@/app/[locale]/kontakt/actions";
import { contactFields, type ContactField } from "@/lib/validation/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { servicesList } from "@/content/services";
import { getLocalized } from "@/lib/i18n-content";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle" };

// Mirrors the Input primitive so the native select matches the other fields.
// text-base below md keeps iOS Safari from zooming in on focus (it zooms on
// any form control under 16px).
const SELECT_CLASS_NAME =
  "border-input bg-transparent focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 h-10 w-full appearance-none rounded-lg border ps-3 pe-9 text-base transition-colors outline-none focus-visible:ring-3 aria-invalid:ring-3 md:text-sm";

const PREFERRED_CONTACT_OPTIONS = [
  { value: "email", icon: Mail, labelKey: "preferredEmail" },
  { value: "phone", icon: Phone, labelKey: "preferredPhone" },
] as const;

type PreferredContact = (typeof PREFERRED_CONTACT_OPTIONS)[number]["value"];

export function ContactForm({
  locale,
  variant = "default",
  title,
  titleAs: Title = "h3",
  className,
}: {
  locale: AppLocale;
  /** "card" wraps the form in its own surface, for use on tinted or dark sections. */
  variant?: "default" | "card";
  /** Optional heading shown above the form (card variant only). */
  title?: string;
  /** Heading level for `title`, so it fits the page's outline. */
  titleAs?: "h2" | "h3";
  className?: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    initialState,
  );
  // useActionState can't be reset from the client, so "send another" just
  // remembers which successful submission the visitor has moved past.
  const [dismissedSubmission, setDismissedSubmission] = useState<number>();
  const showSuccess =
    state.status === "success" && state.submission !== dismissedSubmission;

  const content = showSuccess ? (
    <ContactFormSuccess
      onSendAnother={() => setDismissedSubmission(state.submission)}
    />
  ) : (
    // Keyed on the submission count: React resets an uncontrolled form after
    // its action resolves, so remounting re-applies the echoed `values` as
    // defaults and the visitor keeps what they typed when a submission fails.
    <ContactFormFields
      key={state.submission ?? 0}
      locale={locale}
      state={state}
      formAction={formAction}
      pending={pending}
    />
  );

  if (variant !== "card") {
    return <div className={className}>{content}</div>;
  }

  return (
    <div
      className={cn(
        "border-border bg-card text-card-foreground rounded-3xl border p-6 shadow-lg sm:p-8",
        className,
      )}
    >
      {title && !showSuccess && (
        <Title className="mb-1 text-xl font-semibold">{title}</Title>
      )}
      {content}
    </div>
  );
}

function ContactFormSuccess({ onSendAnother }: { onSendAnother: () => void }) {
  const t = useTranslations("form");
  const ref = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation so keyboard and screen-reader users land
  // on it instead of on a submit button that no longer exists.
  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div
      ref={ref}
      role="status"
      tabIndex={-1}
      className="flex flex-col items-center gap-3 py-6 text-center outline-none"
    >
      <span className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-full">
        <CheckCircle2 size={26} aria-hidden="true" />
      </span>
      <p className="text-lg font-semibold">{t("successTitle")}</p>
      <p className="text-muted-foreground max-w-sm text-sm">
        {t("successBody")}
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-2"
        onClick={onSendAnother}
      >
        {t("sendAnother")}
      </Button>
    </div>
  );
}

function ContactFormFields({
  locale,
  state,
  formAction,
  pending,
}: {
  locale: AppLocale;
  state: ContactFormState;
  formAction: (formData: FormData) => void;
  pending: boolean;
}) {
  const t = useTranslations("form");
  const formRef = useRef<HTMLFormElement>(null);
  const alertRef = useRef<HTMLParagraphElement>(null);

  const values = state.values ?? {};
  const fieldErrors: ContactFieldErrors = state.fieldErrors ?? {};
  const [preferred, setPreferred] = useState<PreferredContact>(
    values.preferredContact === "phone" ? "phone" : "email",
  );

  const errorKey =
    state.message === "rate-limited"
      ? "errorRateLimited"
      : state.message === "invalid"
        ? "errorInvalid"
        : "errorBody";

  // This component remounts after every submission, so on mount after a
  // failed one, send focus to the first invalid field (or the error summary
  // when the failure wasn't about a specific field).
  useEffect(() => {
    if (state.status !== "error") return;
    const firstInvalid = contactFields.find((field) => fieldErrors[field]);
    const target = firstInvalid
      ? formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
      : alertRef.current;
    target?.focus();
    // Only on mount: each submission produces a fresh instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const errorProps = (field: ContactField) =>
    fieldErrors[field]
      ? {
          "aria-invalid": true as const,
          "aria-describedby": `${field}-error`,
        }
      : {};

  const fieldError = (field: ContactField) => {
    const code = fieldErrors[field];
    if (!code) return null;
    return (
      // The summary alert below announces the failure; per-field messages are
      // read through aria-describedby when each field gets focus.
      <FieldError id={`${field}-error`} role={undefined}>
        {code === "phoneRequired"
          ? t("fieldErrors.phoneRequired")
          : t(`fieldErrors.${field}`)}
      </FieldError>
    );
  };

  return (
    <form
      ref={formRef}
      action={formAction}
      aria-busy={pending}
      className="flex flex-col gap-5"
    >
      <p className="text-muted-foreground text-sm">{t("requiredHint")}</p>

      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: hidden from real users, visible to naive bots. sr-only
          clips it in place rather than pushing it off-screen, which would
          add a horizontal scrollbar in RTL. */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field data-invalid={!!fieldErrors.name}>
          <FieldLabel htmlFor="name">
            {t("nameLabel")}
            <RequiredMark />
          </FieldLabel>
          <FieldContent>
            <Input
              id="name"
              name="name"
              required
              maxLength={200}
              autoComplete="name"
              className="h-10"
              defaultValue={values.name}
              {...errorProps("name")}
            />
            {fieldError("name")}
          </FieldContent>
        </Field>

        <Field data-invalid={!!fieldErrors.email}>
          <FieldLabel htmlFor="email">
            {t("emailLabel")}
            <RequiredMark />
          </FieldLabel>
          <FieldContent>
            <Input
              id="email"
              name="email"
              type="email"
              required
              dir="ltr"
              autoComplete="email"
              className="h-10"
              defaultValue={values.email}
              {...errorProps("email")}
            />
            {fieldError("email")}
          </FieldContent>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-sm leading-snug font-medium">
            {t("preferredContactLabel")}
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {PREFERRED_CONTACT_OPTIONS.map(
              ({ value, icon: Icon, labelKey }) => (
                <label
                  key={value}
                  className="border-input text-muted-foreground has-checked:border-primary has-checked:bg-primary/5 has-checked:text-primary has-focus-visible:border-ring has-focus-visible:ring-ring/50 hover:bg-muted/50 flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border text-sm font-medium transition-colors has-focus-visible:ring-3"
                >
                  <input
                    type="radio"
                    name="preferredContact"
                    value={value}
                    checked={preferred === value}
                    onChange={() => setPreferred(value)}
                    className="sr-only"
                  />
                  <Icon size={16} aria-hidden="true" />
                  {t(labelKey)}
                </label>
              ),
            )}
          </div>
        </fieldset>

        <Field data-invalid={!!fieldErrors.phone}>
          <FieldLabel htmlFor="phone">
            {preferred === "phone" ? t("phoneLabelRequired") : t("phoneLabel")}
            {preferred === "phone" && <RequiredMark />}
          </FieldLabel>
          <FieldContent>
            <Input
              id="phone"
              name="phone"
              type="tel"
              dir="ltr"
              required={preferred === "phone"}
              maxLength={50}
              autoComplete="tel"
              className="h-10"
              defaultValue={values.phone}
              {...errorProps("phone")}
            />
            {fieldError("phone")}
          </FieldContent>
        </Field>
      </div>

      <Field data-invalid={!!fieldErrors.service}>
        <FieldLabel htmlFor="service">{t("serviceLabel")}</FieldLabel>
        <FieldContent>
          <div className="relative">
            <select
              id="service"
              name="service"
              defaultValue={values.service ?? ""}
              className={SELECT_CLASS_NAME}
              {...errorProps("service")}
            >
              <option value="">{t("servicePlaceholder")}</option>
              {servicesList.map((service) => (
                <option key={service.key} value={service.key}>
                  {getLocalized(service.name, locale)}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              aria-hidden="true"
              className="text-muted-foreground pointer-events-none absolute end-3 top-1/2 -translate-y-1/2"
            />
          </div>
          {fieldError("service")}
        </FieldContent>
      </Field>

      <Field data-invalid={!!fieldErrors.message}>
        <FieldLabel htmlFor="message">
          {t("messageLabel")}
          <RequiredMark />
        </FieldLabel>
        <FieldContent>
          <Textarea
            id="message"
            name="message"
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            className="min-h-32"
            defaultValue={values.message}
            {...errorProps("message")}
          />
          {fieldError("message")}
        </FieldContent>
      </Field>

      <div className="flex flex-col gap-1">
        <Field orientation="horizontal">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            defaultChecked={values.consent}
            className="accent-primary mt-0.5 size-5 shrink-0"
            {...errorProps("consent")}
          />
          <FieldLabel
            htmlFor="consent"
            className="block text-sm leading-snug font-normal"
          >
            {t.rich("consentLabel", {
              privacy: (chunks) => (
                <Link
                  href="/integritetspolicy"
                  target="_blank"
                  rel="noopener"
                  className="text-primary underline underline-offset-4 hover:no-underline"
                >
                  {chunks}
                </Link>
              ),
            })}
            <RequiredMark />
          </FieldLabel>
        </Field>
        <div className="ps-7">{fieldError("consent")}</div>
      </div>

      {state.status === "error" && (
        <p
          ref={alertRef}
          role="alert"
          tabIndex={-1}
          className="border-destructive/30 bg-destructive/5 text-destructive rounded-lg border px-3 py-2 text-sm outline-none"
        >
          <span className="font-semibold">{t("errorTitle")}</span> —{" "}
          {t(errorKey)}
        </p>
      )}

      <Button
        type="submit"
        disabled={pending}
        size="lg"
        className="h-11 w-full gap-2 sm:w-auto sm:self-start sm:px-8"
      >
        {pending ? (
          <Loader2 size={18} aria-hidden="true" className="animate-spin" />
        ) : (
          <Send size={18} aria-hidden="true" className="rtl:-scale-x-100" />
        )}
        {pending ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}

function RequiredMark() {
  // The input's own `required` attribute is what assistive tech announces;
  // the asterisk is only a visual cue.
  return (
    <span aria-hidden="true" className="text-destructive -ms-1">
      *
    </span>
  );
}
