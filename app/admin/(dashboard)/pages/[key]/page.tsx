import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPageDef } from "@/lib/cms/pages";
import { getPageOverride } from "@/lib/cms/admin";
import { getPageUrls, toPath } from "@/lib/admin/page-urls";
import { PageEditor } from "./PageEditor";

type Params = Promise<{ key: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const def = getPageDef(decodeURIComponent((await params).key));
  return { title: def ? `${def.label} · Pages` : "Pages" };
}

export default async function EditPagePage({ params }: { params: Params }) {
  const key = decodeURIComponent((await params).key);
  const def = getPageDef(key);
  if (!def) notFound();

  const override = await getPageOverride(key);
  const urls = getPageUrls(def);

  return (
    <PageEditor
      def={def}
      initial={override ?? {}}
      urls={urls}
      viewPath={urls ? toPath(urls.sv) : null}
    />
  );
}
