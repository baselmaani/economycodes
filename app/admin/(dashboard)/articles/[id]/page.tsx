import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticle } from "@/lib/cms/admin";
import { toArticleInput } from "@/lib/cms/article-json";
import { getFaqOptions } from "@/lib/admin/faq-options";
import { siteUrl } from "@/lib/site";
import { ArticleEditor } from "../ArticleEditor";

type Params = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const article = await getArticle((await params).id);
  return { title: article ? article.title.sv : "Article" };
}

export default async function EditArticlePage({ params }: { params: Params }) {
  const article = await getArticle((await params).id);
  if (!article) notFound();

  return (
    <ArticleEditor
      key={article.id}
      mode="update"
      initial={toArticleInput(article)}
      faqOptions={getFaqOptions()}
      siteUrl={siteUrl}
    />
  );
}
