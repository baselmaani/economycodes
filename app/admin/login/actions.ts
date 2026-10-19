"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  createSession,
  destroySession,
  isAdminConfigured,
} from "@/lib/admin/session";
import { passwordMatches } from "@/lib/admin/token";
import { isRateLimited } from "@/lib/rate-limit";

export interface LoginState {
  error?: string;
}

export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return { error: "The dashboard is not configured (see .env.example)." };
  }

  const requestHeaders = await headers();
  const ip =
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(`admin-login:${ip}`)) {
    return { error: "Too many attempts. Wait a minute and try again." };
  }

  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    !(await passwordMatches(password, process.env.ADMIN_PASSWORD!))
  ) {
    return { error: "Wrong password." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}
