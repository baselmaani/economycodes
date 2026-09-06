import Link from "next/link";

/**
 * Fallback for paths that don't match any locale segment at all (an edge
 * case middleware should normally prevent). Kept minimal and locale-neutral
 * since it renders outside app/[locale]/layout.tsx's chrome/translations.
 */
export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-semibold">Sidan kunde inte hittas</h1>
      <p className="text-muted-foreground">
        Sidan du letar efter finns inte längre eller har flyttats.
      </p>
      <Link href="/" className="text-primary font-medium hover:underline">
        Till startsidan
      </Link>
    </div>
  );
}
