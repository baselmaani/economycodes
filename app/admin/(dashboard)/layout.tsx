import Image from "next/image";
import { ExternalLink, LogOut } from "lucide-react";

import { requireAdmin } from "@/lib/admin/session";
import { hasDatabase } from "@/lib/db";
import { AdminNav } from "@/components/admin/AdminNav";
import { Button } from "@/components/ui/button";
import { logout } from "../login/actions";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="bg-card border-border flex shrink-0 items-center justify-between gap-4 border-b p-3 md:sticky md:top-0 md:h-screen md:w-60 md:flex-col md:items-stretch md:justify-start md:border-e md:border-b-0 md:p-4">
        <Image
          src="/media/optimized/logo-horizontal.webp"
          alt="Economy Codes"
          width={120}
          height={50}
          className="hidden md:mb-6 md:block"
        />
        <AdminNav />
        <div className="flex gap-1 md:mt-auto md:flex-col">
          <Button
            render={<a href="/" target="_blank" rel="noreferrer" />}
            variant="ghost"
            size="sm"
            className="justify-start"
          >
            <ExternalLink aria-hidden="true" />
            <span className="hidden sm:inline">View site</span>
          </Button>
          <form action={logout}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <LogOut aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </form>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {hasDatabase ? (
          children
        ) : (
          <div className="border-destructive/30 bg-destructive/5 max-w-2xl rounded-2xl border p-6">
            <h1 className="text-lg font-semibold">Database not configured</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Set <code>DATABASE_URL</code> (Neon) and{" "}
              <code>BLOB_READ_WRITE_TOKEN</code> (Vercel Blob), then run{" "}
              <code>npm run db:migrate</code> and <code>npm run cms:seed</code>.
              Until then the site keeps using the built-in content.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
