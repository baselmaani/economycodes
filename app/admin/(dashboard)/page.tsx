import type { Metadata } from "next";
import Link from "next/link";
import { FileJson, FileText, Image as ImageIcon, Layers } from "lucide-react";

import { getOverview } from "@/lib/cms/admin";
import { getPageDef } from "@/lib/cms/pages";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Overview" };

function StatTile({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-card border-border hover:border-primary/40 rounded-2xl border p-5 transition-colors"
    >
      <p className="text-muted-foreground text-sm">{label}</p>
      <p className="mt-1 text-3xl font-semibold tabular-nums">{value}</p>
    </Link>
  );
}

const QUICK_LINKS = [
  {
    href: "/admin/articles/new",
    label: "Import an article from JSON",
    icon: FileJson,
  },
  { href: "/admin/pages/home", label: "Edit the home page", icon: Layers },
  { href: "/admin/articles", label: "Manage articles", icon: FileText },
  { href: "/admin/media", label: "Upload images", icon: ImageIcon },
];

export default async function OverviewPage() {
  const overview = await getOverview();

  return (
    <>
      <PageHeader
        title="Overview"
        description="Changes you save here go live on the site straight away."
      />
      <div className="grid max-w-4xl gap-4 sm:grid-cols-3">
        <StatTile
          label="Published articles"
          value={overview.published}
          href="/admin/articles"
        />
        <StatTile
          label="Drafts"
          value={overview.drafts}
          href="/admin/articles"
        />
        <StatTile
          label="Uploaded images"
          value={overview.media}
          href="/admin/media"
        />
      </div>

      <div className="mt-8 grid max-w-4xl gap-6 lg:grid-cols-2">
        <section className="bg-card border-border rounded-2xl border p-5">
          <h2 className="font-semibold">Quick actions</h2>
          <ul className="mt-3 flex flex-col gap-1">
            {QUICK_LINKS.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:bg-muted flex items-center gap-2 rounded-lg px-2 py-2 text-sm"
                >
                  <Icon size={16} aria-hidden="true" className="text-primary" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-card border-border rounded-2xl border p-5">
          <h2 className="font-semibold">Recently edited</h2>
          {overview.recentArticles.length + overview.recentPages.length ===
          0 ? (
            <p className="text-muted-foreground mt-3 text-sm">
              Nothing edited yet.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col gap-1 text-sm">
              {overview.recentArticles.map((article) => (
                <li key={article.id}>
                  <Link
                    href={`/admin/articles/${article.id}`}
                    className="hover:bg-muted flex items-center justify-between gap-2 rounded-lg px-2 py-2"
                  >
                    <span className="truncate">{article.title.sv}</span>
                    <Badge
                      variant={
                        article.status === "published" ? "default" : "outline"
                      }
                    >
                      {article.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </Link>
                </li>
              ))}
              {overview.recentPages.map((page) => (
                <li key={page.key}>
                  <Link
                    href={`/admin/pages/${encodeURIComponent(page.key)}`}
                    className="hover:bg-muted flex items-center justify-between gap-2 rounded-lg px-2 py-2"
                  >
                    <span className="truncate">
                      {getPageDef(page.key)?.label ?? page.key}
                    </span>
                    <span className="text-muted-foreground text-xs">Page</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
