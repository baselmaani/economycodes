import { NextResponse } from "next/server";

import { isAdmin } from "@/lib/admin/session";
import { ARTICLE_TEMPLATE } from "@/lib/cms/article-json";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return new NextResponse(JSON.stringify(ARTICLE_TEMPLATE, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="article-template.json"',
    },
  });
}
