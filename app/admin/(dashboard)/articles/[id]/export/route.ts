import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin/session";
import { getArticle } from "@/lib/cms/admin";
import { toArticleInput } from "@/lib/cms/article-json";

/** Downloads an article in the same JSON format the import accepts. */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return new NextResponse(JSON.stringify(toArticleInput(article), null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${id}.json"`,
    },
  });
}
