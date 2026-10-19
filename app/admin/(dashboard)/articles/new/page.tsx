import type { Metadata } from "next";

import { emptyArticle } from "@/lib/cms/article-json";
import { getFaqOptions } from "@/lib/admin/faq-options";
import { siteUrl } from "@/lib/site";
import { ArticleEditor } from "../ArticleEditor";
import { JsonImport } from "./JsonImport";
import { NewArticleTabs } from "./NewArticleTabs";

export const metadata: Metadata = { title: "New article" };

export default function NewArticlePage() {
  return (
    <NewArticleTabs
      importView={<JsonImport />}
      formView={
        <ArticleEditor
          mode="create"
          initial={emptyArticle()}
          faqOptions={getFaqOptions()}
          siteUrl={siteUrl}
        />
      }
    />
  );
}
