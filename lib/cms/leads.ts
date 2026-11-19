import "server-only";

import { and, count, desc, eq, lt, type SQL } from "drizzle-orm";

import {
  contactSubmissionsTable,
  getDb,
  hasDatabase,
  type ContactSubmissionRow,
} from "@/lib/db";
import type { ContactFormValues } from "@/lib/validation/contact";

/**
 * Contact-form submissions. Written by the public contact action (best
 * effort: a DB failure never blocks the email), read and managed from the
 * dashboard and the MCP endpoint. Callers of the management functions check
 * auth.
 */

export type LeadStatus = ContactSubmissionRow["status"];
export const LEAD_STATUSES = ["new", "read", "archived"] as const;

export interface Lead {
  id: string;
  status: LeadStatus;
  locale: string;
  name: string;
  email: string;
  phone: string | null;
  preferredContact: string;
  service: string | null;
  message: string;
  emailSent: boolean;
  createdAt: string;
}

function toLead(row: ContactSubmissionRow): Lead {
  return { ...row, createdAt: row.createdAt.toISOString() };
}

/** Stores a submission; returns its id, or undefined when there's no DB or the insert failed. */
export async function recordSubmission(
  values: ContactFormValues,
): Promise<string | undefined> {
  if (!hasDatabase) return undefined;
  try {
    const [row] = await getDb()
      .insert(contactSubmissionsTable)
      .values({
        locale: values.locale,
        name: values.name,
        email: values.email,
        phone: values.phone || null,
        preferredContact: values.preferredContact,
        service: values.service || null,
        message: values.message,
      })
      .returning({ id: contactSubmissionsTable.id });
    return row?.id;
  } catch (error) {
    console.error("Could not store contact submission", error);
    return undefined;
  }
}

export async function markSubmissionEmailed(id: string): Promise<void> {
  try {
    await getDb()
      .update(contactSubmissionsTable)
      .set({ emailSent: true })
      .where(eq(contactSubmissionsTable.id, id));
  } catch (error) {
    console.error("Could not update contact submission", error);
  }
}

export async function listLeads({
  status,
  limit = 50,
  before,
}: {
  status?: LeadStatus;
  limit?: number;
  /** ISO timestamp: only submissions older than this (for paging). */
  before?: string;
} = {}): Promise<Lead[]> {
  const conditions: SQL[] = [];
  if (status) conditions.push(eq(contactSubmissionsTable.status, status));
  if (before) {
    conditions.push(lt(contactSubmissionsTable.createdAt, new Date(before)));
  }
  const rows = await getDb()
    .select()
    .from(contactSubmissionsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(contactSubmissionsTable.createdAt))
    .limit(Math.max(1, Math.min(limit, 200)));
  return rows.map(toLead);
}

export async function countLeads(): Promise<Record<LeadStatus, number>> {
  const rows = await getDb()
    .select({ status: contactSubmissionsTable.status, count: count() })
    .from(contactSubmissionsTable)
    .groupBy(contactSubmissionsTable.status);
  const counts: Record<LeadStatus, number> = { new: 0, read: 0, archived: 0 };
  for (const row of rows) counts[row.status] = row.count;
  return counts;
}

export async function getLead(id: string): Promise<Lead | undefined> {
  const [row] = await getDb()
    .select()
    .from(contactSubmissionsTable)
    .where(eq(contactSubmissionsTable.id, id));
  return row ? toLead(row) : undefined;
}

export async function setLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<boolean> {
  const rows = await getDb()
    .update(contactSubmissionsTable)
    .set({ status })
    .where(eq(contactSubmissionsTable.id, id))
    .returning({ id: contactSubmissionsTable.id });
  return rows.length > 0;
}

export async function deleteLead(id: string): Promise<boolean> {
  const rows = await getDb()
    .delete(contactSubmissionsTable)
    .where(eq(contactSubmissionsTable.id, id))
    .returning({ id: contactSubmissionsTable.id });
  return rows.length > 0;
}
