import "server-only";

import { z } from "zod";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import {
  countLeads,
  deleteLead,
  getLead,
  LEAD_STATUSES,
  listLeads,
  setLeadStatus,
} from "@/lib/cms/leads";
import { fail, ok, safe } from "./util";

export function registerMessageTools(server: McpServer) {
  server.registerTool(
    "list_messages",
    {
      title: "List contact-form messages",
      description:
        "Messages sent through the website's contact form, newest first, with counts per status. `emailSent: false` means the notification email failed, so the message was only stored here.",
      inputSchema: {
        status: z.enum(LEAD_STATUSES).optional(),
        limit: z.number().int().min(1).max(200).default(50),
        before: z
          .string()
          .optional()
          .describe("ISO timestamp: only older messages (for paging)"),
      },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ status, limit, before }) => {
      const [counts, messages] = await Promise.all([
        countLeads(),
        listLeads({ status, limit, before }),
      ]);
      return ok({ counts, messages });
    }),
  );

  server.registerTool(
    "get_message",
    {
      title: "Get a message",
      description: "One contact-form message.",
      inputSchema: { id: z.string() },
      annotations: { readOnlyHint: true },
    },
    safe(async ({ id }) => {
      const lead = await getLead(id);
      return lead ? ok(lead) : fail("Message not found");
    }),
  );

  server.registerTool(
    "set_message_status",
    {
      title: "Mark a message",
      description: "new, read or archived (archived ones leave the inbox).",
      inputSchema: { id: z.string(), status: z.enum(LEAD_STATUSES) },
      annotations: { idempotentHint: true },
    },
    safe(async ({ id, status }) =>
      (await setLeadStatus(id, status))
        ? ok({ ok: true, id, status })
        : fail("Message not found"),
    ),
  );

  server.registerTool(
    "delete_message",
    {
      title: "Delete a message",
      description:
        "Permanently deletes a contact-form message (e.g. on a GDPR erasure request).",
      inputSchema: { id: z.string() },
      annotations: { destructiveHint: true },
    },
    safe(async ({ id }) =>
      (await deleteLead(id))
        ? ok({ ok: true, message: "Deleted." })
        : fail("Message not found"),
    ),
  );
}
