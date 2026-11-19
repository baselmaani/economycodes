import type { Metadata } from "next";
import Link from "next/link";

import { countLeads, listLeads, type LeadStatus } from "@/lib/cms/leads";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MessageActions } from "./MessageActions";

export const metadata: Metadata = { title: "Messages" };

const FILTERS: { status?: LeadStatus; label: string }[] = [
  { label: "Inbox" },
  { status: "new", label: "New" },
  { status: "archived", label: "Archived" },
];

const dateFormat = new Intl.DateTimeFormat("sv-SE", {
  dateStyle: "short",
  timeStyle: "short",
  timeZone: "Europe/Stockholm",
});

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status: param } = await searchParams;
  const status = FILTERS.find((filter) => filter.status === param)?.status;
  let counts: Awaited<ReturnType<typeof countLeads>>;
  let leads: Awaited<ReturnType<typeof listLeads>>;
  try {
    [counts, leads] = await Promise.all([
      countLeads(),
      listLeads({ status, limit: 200 }),
    ]);
  } catch {
    return (
      <>
        <PageHeader title="Messages" />
        <div className="border-destructive/30 bg-destructive/5 max-w-2xl rounded-2xl border p-6 text-sm">
          The messages table is missing. Run <code>npm run db:migrate</code>{" "}
          against the database, then reload.
        </div>
      </>
    );
  }
  // The inbox leaves archived messages out.
  const shown = status
    ? leads
    : leads.filter((lead) => lead.status !== "archived");

  return (
    <>
      <PageHeader
        title="Messages"
        description="Everything sent through the contact form, newest first. Each message is also emailed to you."
      />

      <nav aria-label="Filter" className="mb-4 flex gap-1 text-sm">
        {FILTERS.map((filter) => {
          const active = filter.status === status;
          const count = filter.status
            ? counts[filter.status]
            : counts.new + counts.read;
          return (
            <Link
              key={filter.label}
              href={
                filter.status
                  ? `/admin/messages?status=${filter.status}`
                  : "/admin/messages"
              }
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-lg px-3 py-1.5 font-medium",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {filter.label} <span className="tabular-nums">({count})</span>
            </Link>
          );
        })}
      </nav>

      {shown.length === 0 ? (
        <div className="bg-card border-border max-w-xl rounded-2xl border p-6 text-sm">
          <p className="font-medium">No messages here.</p>
        </div>
      ) : (
        <ul className="flex max-w-4xl flex-col gap-3">
          {shown.map((lead) => (
            <li
              key={lead.id}
              className={cn(
                "bg-card border-border rounded-2xl border p-5",
                lead.status === "new" && "border-primary/50",
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-medium">
                    {lead.name} {lead.status === "new" && <Badge>New</Badge>}
                    {!lead.emailSent && (
                      <Badge variant="destructive" className="ms-1">
                        Email not sent
                      </Badge>
                    )}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    <a
                      href={`mailto:${lead.email}`}
                      className="hover:underline"
                    >
                      {lead.email}
                    </a>
                    {lead.phone && (
                      <>
                        {" · "}
                        <a
                          href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
                          className="hover:underline"
                        >
                          {lead.phone}
                        </a>
                      </>
                    )}
                    {" · "}
                    {dateFormat.format(new Date(lead.createdAt))}
                    {" · "}
                    <span className="uppercase">{lead.locale}</span>
                    {lead.service && <> · {lead.service}</>}
                    {lead.preferredContact === "phone" && <> · prefers phone</>}
                  </p>
                </div>
                <MessageActions id={lead.id} status={lead.status} />
              </div>
              <p className="mt-3 text-sm whitespace-pre-wrap">{lead.message}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
