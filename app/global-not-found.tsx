import Link from "next/link";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Sidan kunde inte hittas | Economy Codes",
  description: "Sidan du letar efter finns inte längre eller har flyttats.",
};

/**
 * Handles URLs that don't match any locale segment at all (middleware
 * should normally prevent this). global-not-found bypasses every layout,
 * so -- unlike app/[locale]/not-found.tsx -- it supplies its own
 * <html>/<body> and stays locale-neutral and minimal.
 */
export default function GlobalNotFound() {
  return (
    <html lang="sv">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center antialiased">
        <h1 className="text-3xl font-semibold">Sidan kunde inte hittas</h1>
        <p className="text-muted-foreground">
          Sidan du letar efter finns inte längre eller har flyttats.
        </p>
        <Link href="/" className="text-primary font-medium hover:underline">
          Till startsidan
        </Link>
      </body>
    </html>
  );
}
