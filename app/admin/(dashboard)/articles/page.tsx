import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

import { listArticles } from "@/lib/cms/admin";
import { articlePath } from "@/lib/cms/article-json";
import { PageHeader } from "@/components/admin/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArticleRowActions } from "./ArticleRowActions";

export const metadata: Metadata = { title: "Articles" };

export default async function ArticlesListPage() {
  const articles = await listArticles();

  return (
    <>
      <PageHeader
        title="Articles"
        description="Drafts are only visible here. Publishing makes an article live on /artiklar, in the sitemap and in all its languages."
        actions={
          <Button render={<Link href="/admin/articles/new" />}>
            <Plus aria-hidden="true" /> New article
          </Button>
        }
      />

      {articles.length === 0 ? (
        <div className="bg-card border-border max-w-xl rounded-2xl border p-6 text-sm">
          <p className="font-medium">No articles yet.</p>
          <p className="text-muted-foreground mt-1">
            Import one from JSON, or run <code>npm run cms:seed</code> to load
            the site&apos;s existing articles.
          </p>
        </div>
      ) : (
        <div className="bg-card border-border overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-muted-foreground border-border border-b text-start text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-start font-medium">Title</th>
                <th className="px-4 py-3 text-start font-medium">Status</th>
                <th className="px-4 py-3 text-start font-medium">Published</th>
                <th className="px-4 py-3 text-start font-medium">Languages</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {articles.map((article) => (
                <tr key={article.id} className="align-top">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="font-medium hover:underline"
                    >
                      {article.title.sv}
                    </Link>
                    <p className="text-muted-foreground text-xs">
                      {article.id}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant={
                        article.status === "published" ? "default" : "outline"
                      }
                    >
                      {article.status === "published" ? "Published" : "Draft"}
                    </Badge>
                    {article.seo.noindex && (
                      <Badge variant="secondary" className="ms-1">
                        noindex
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 tabular-nums">
                    {article.publishedAt}
                  </td>
                  <td className="text-muted-foreground px-4 py-3 text-xs uppercase">
                    {(["sv", "en", "ar"] as const)
                      .filter((locale) => article.title[locale])
                      .join(" · ")}
                  </td>
                  <td className="px-4 py-3">
                    <ArticleRowActions
                      id={article.id}
                      status={article.status}
                      publicPath={articlePath("sv", article.slug.sv)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
