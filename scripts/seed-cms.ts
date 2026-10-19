/**
 * Copies the articles in content/articles/* into the Neon database so they
 * can be edited from the admin dashboard.
 *
 *   npm run cms:seed            # adds missing articles, leaves existing rows alone
 *   npm run cms:seed -- --force # overwrites rows with the content/ version
 *
 * Images keep their /media/optimized/... paths.
 */
import { loadEnvConfig } from "@next/env";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { articles } from "@/content/articles/meta";
import { articleBodies } from "@/content/articles/body";
import { articlesTable } from "@/lib/db/schema";
import { toArticleInput } from "@/lib/cms/article-json";
import { articleInputSchema, formatIssues } from "@/lib/cms/schemas";

loadEnvConfig(process.cwd());

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (.env.local)");
  const force = process.argv.includes("--force");
  const db = drizzle(neon(url));

  for (const meta of articles) {
    const parsed = articleInputSchema.safeParse(
      toArticleInput({
        ...meta,
        status: "published",
        body: articleBodies[meta.id] ?? { sv: [] },
        seo: {},
      }),
    );
    if (!parsed.success) {
      throw new Error(`${meta.id}: ${formatIssues(parsed.error).join("; ")}`);
    }
    const article = parsed.data;
    const values = { ...article, updatedAt: article.updatedAt ?? null };
    const insert = db.insert(articlesTable).values(values);
    const result = force
      ? await insert.onConflictDoUpdate({
          target: articlesTable.id,
          set: { ...values, modifiedAt: new Date() },
        })
      : await insert.onConflictDoNothing();
    console.log(
      `${result.rowCount ? (force ? "upserted" : "added  ") : "skipped"}  ${meta.id}`,
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
