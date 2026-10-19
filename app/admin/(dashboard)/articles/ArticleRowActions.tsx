"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Download, ExternalLink, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ArticleStatus } from "@/lib/cms/schemas";
import { deleteArticleAction, setArticleStatusAction } from "./actions";

export function ArticleRowActions({
  id,
  status,
  publicPath,
}: {
  id: string;
  status: ArticleStatus;
  publicPath: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function toggleStatus() {
    startTransition(async () => {
      await setArticleStatusAction(
        id,
        status === "published" ? "draft" : "published",
      );
      router.refresh();
    });
  }

  function remove() {
    if (
      !window.confirm(
        `Delete "${id}" permanently? Export it first if you might need it again.`,
      )
    ) {
      return;
    }
    startTransition(async () => {
      await deleteArticleAction(id);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap justify-end gap-1">
      <Button
        size="xs"
        variant={status === "published" ? "outline" : "default"}
        onClick={toggleStatus}
        disabled={pending}
      >
        {status === "published" ? "Unpublish" : "Publish"}
      </Button>
      <Button
        render={<Link href={`/admin/articles/${id}`} />}
        size="icon-xs"
        variant="ghost"
        aria-label="Edit"
      >
        <Pencil />
      </Button>
      {status === "published" && (
        <Button
          render={<a href={publicPath} target="_blank" rel="noreferrer" />}
          size="icon-xs"
          variant="ghost"
          aria-label="View on site"
        >
          <ExternalLink />
        </Button>
      )}
      <Button
        render={<a href={`/admin/articles/${id}/export`} download />}
        size="icon-xs"
        variant="ghost"
        aria-label="Export JSON"
      >
        <Download />
      </Button>
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Delete"
        onClick={remove}
        disabled={pending}
        className="text-destructive"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
