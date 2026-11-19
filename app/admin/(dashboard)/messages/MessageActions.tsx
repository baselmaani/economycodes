"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Archive, MailOpen, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { LeadStatus } from "@/lib/cms/leads";
import { deleteMessageAction, setMessageStatusAction } from "./actions";

export function MessageActions({
  id,
  status,
}: {
  id: string;
  status: LeadStatus;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setStatus(next: LeadStatus) {
    startTransition(async () => {
      await setMessageStatusAction(id, next);
      router.refresh();
    });
  }

  function remove() {
    if (!window.confirm("Delete this message permanently?")) return;
    startTransition(async () => {
      await deleteMessageAction(id);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap justify-end gap-1">
      {status === "new" && (
        <Button
          size="xs"
          variant="outline"
          onClick={() => setStatus("read")}
          disabled={pending}
        >
          <MailOpen aria-hidden="true" /> Mark read
        </Button>
      )}
      {status !== "archived" ? (
        <Button
          size="icon-xs"
          variant="ghost"
          aria-label="Archive"
          onClick={() => setStatus("archived")}
          disabled={pending}
        >
          <Archive />
        </Button>
      ) : (
        <Button
          size="xs"
          variant="ghost"
          onClick={() => setStatus("read")}
          disabled={pending}
        >
          Restore
        </Button>
      )}
      <Button
        size="icon-xs"
        variant="ghost"
        aria-label="Delete"
        onClick={remove}
        disabled={pending}
      >
        <Trash2 />
      </Button>
    </div>
  );
}
