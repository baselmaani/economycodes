import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

/** True when a Neon database is configured; without it the site renders the static content/ defaults. */
export const hasDatabase = Boolean(process.env.DATABASE_URL);

type Database = ReturnType<typeof drizzle<typeof schema>>;

let instance: Database | undefined;

export function getDb(): Database {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  instance ??= drizzle(neon(process.env.DATABASE_URL), { schema });
  return instance;
}

export * from "./schema";
