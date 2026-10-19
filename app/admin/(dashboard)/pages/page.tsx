import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { pageDefs, type PageDef } from "@/lib/cms/pages";
import { listPageOverrideTimes } from "@/lib/cms/admin";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Pages & SEO" };

const GROUPS: { group: PageDef["group"]; description: string }[] = [
  { group: "Pages", description: "SEO, headlines, intros and images" },
  { group: "Services", description: "SEO for each service page" },
  { group: "Legal", description: "SEO only" },
];

export default async function PagesListPage() {
  const edited = await listPageOverrideTimes();

  return (
    <>
      <PageHeader
        title="Pages & SEO"
        description="Edit meta titles and descriptions, main texts and images. Anything you don't change keeps the site's original content."
      />
      <div className="flex max-w-3xl flex-col gap-8">
        {GROUPS.map(({ group, description }) => (
          <section key={group}>
            <h2 className="font-semibold">{group}</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
            <ul className="bg-card border-border mt-3 divide-y overflow-hidden rounded-2xl border">
              {pageDefs
                .filter((page) => page.group === group)
                .map((page) => {
                  const modified = edited.get(page.key);
                  return (
                    <li key={page.key}>
                      <Link
                        href={`/admin/pages/${encodeURIComponent(page.key)}`}
                        className="hover:bg-muted/60 flex items-center justify-between gap-3 px-4 py-3 text-sm"
                      >
                        <span className="font-medium">{page.label}</span>
                        <span className="flex items-center gap-2">
                          {modified && (
                            <Badge variant="secondary">
                              Edited {modified.toISOString().slice(0, 10)}
                            </Badge>
                          )}
                          <ChevronRight
                            size={16}
                            aria-hidden="true"
                            className="text-muted-foreground"
                          />
                        </span>
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
