import type { Metadata } from "next";

import { PageHeader } from "@/components/admin/PageHeader";
import { listMediaAction } from "./actions";
import { MediaLibrary } from "./MediaLibrary";

export const metadata: Metadata = { title: "Media" };

export default async function MediaPage() {
  const items = await listMediaAction();
  return (
    <>
      <PageHeader
        title="Media"
        description="Images uploaded here can be used on pages, as article covers and as social share images."
      />
      <MediaLibrary initial={items} />
    </>
  );
}
