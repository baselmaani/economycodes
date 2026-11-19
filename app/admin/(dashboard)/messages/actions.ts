"use server";

import { requireAdmin } from "@/lib/admin/session";
import type { ActionResult } from "@/lib/admin/action-result";
import {
  deleteLead,
  LEAD_STATUSES,
  setLeadStatus,
  type LeadStatus,
} from "@/lib/cms/leads";

export async function setMessageStatusAction(
  id: string,
  status: LeadStatus,
): Promise<ActionResult> {
  await requireAdmin();
  if (!LEAD_STATUSES.includes(status)) {
    return { ok: false, errors: ["Invalid status"] };
  }
  return (await setLeadStatus(id, status))
    ? { ok: true }
    : { ok: false, errors: ["Message not found"] };
}

export async function deleteMessageAction(id: string): Promise<ActionResult> {
  await requireAdmin();
  return (await deleteLead(id))
    ? { ok: true }
    : { ok: false, errors: ["Message not found"] };
}
