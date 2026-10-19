import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";

import { isAdmin, isAdminConfigured } from "@/lib/admin/session";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="bg-card border-border w-full max-w-sm rounded-2xl border p-8 shadow-sm">
        <Image
          src="/media/optimized/logo-horizontal.webp"
          alt="Economy Codes"
          width={144}
          height={60}
          className="mb-6"
        />
        <h1 className="mb-1 text-xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Sign in to edit pages, articles and media.
        </p>
        {isAdminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="text-destructive text-sm">
            Set <code>ADMIN_PASSWORD</code> and{" "}
            <code>ADMIN_SESSION_SECRET</code> (32+ characters) in the
            environment to enable the dashboard.
          </p>
        )}
      </div>
    </main>
  );
}
