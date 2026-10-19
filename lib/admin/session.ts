import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  SESSION_TTL_SECONDS,
  signSessionToken,
  verifySessionToken,
} from "@/lib/admin/token";

const COOKIE_NAME = "ec_admin";

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set");
  return secret;
}

/** True when the admin env vars are configured; the dashboard refuses to run otherwise. */
export function isAdminConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_PASSWORD &&
    (process.env.ADMIN_SESSION_SECRET?.length ?? 0) >= 32,
  );
}

export async function createSession(): Promise<void> {
  const token = await signSessionToken(getSecret());
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

export async function isAdmin(): Promise<boolean> {
  // Read the cookie first so the caller is always request-time, even when
  // the dashboard isn't configured.
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!isAdminConfigured()) return false;
  return verifySessionToken(token, getSecret());
}

/**
 * Guard for every admin page, server action and route handler. Redirects to
 * the login page rather than throwing, so it also works from layouts.
 */
export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) redirect("/admin/login");
}
