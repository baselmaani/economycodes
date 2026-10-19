import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// Same .env.local / .env loading as `next dev`, so DATABASE_URL is picked up.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
