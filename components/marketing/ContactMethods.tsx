import { Mail, MessageCircle, Phone } from "lucide-react";

import { business } from "@/content/business";
import { cn } from "@/lib/utils";

const tones = {
  light: {
    item: "border-border bg-card text-foreground hover:border-primary/40 hover:text-primary",
    icon: "bg-primary/10 text-primary",
  },
  onDark: {
    item: "border-white/15 bg-white/5 text-white hover:bg-white/10",
    icon: "bg-white/10 text-brand-bright",
  },
} as const;

/** Direct phone / email / WhatsApp links, shared by the homepage and /kontakt. */
export function ContactMethods({
  tone = "light",
  className,
}: {
  tone?: keyof typeof tones;
  className?: string;
}) {
  const styles = tones[tone];
  const methods = [
    {
      href: business.phoneHref,
      icon: Phone,
      label: <span dir="ltr">{business.phone}</span>,
    },
    { href: `mailto:${business.email}`, icon: Mail, label: business.email },
    { href: business.whatsappHref, icon: MessageCircle, label: "WhatsApp" },
  ];

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {methods.map(({ href, icon: Icon, label }) => (
        <li key={href}>
          <a
            href={href}
            className={cn(
              "flex items-center gap-3 rounded-2xl border p-3 font-medium transition-colors",
              styles.item,
            )}
          >
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-xl",
                styles.icon,
              )}
            >
              <Icon size={18} aria-hidden="true" />
            </span>
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}
