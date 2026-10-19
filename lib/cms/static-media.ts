/**
 * Images already shipped in public/media/optimized, offered alongside uploads
 * in the dashboard's image picker so current images can be re-selected.
 * (Read from this list rather than the filesystem: public/ isn't part of the
 * serverless function bundle on Vercel.)
 */
export const staticMedia: { src: string; width: number; height: number }[] = [
  { src: "/media/optimized/bokforing.webp", width: 1024, height: 683 },
  {
    src: "/media/optimized/etablering-av-foreningar.webp",
    width: 780,
    height: 520,
  },
  {
    src: "/media/optimized/foretagsregistrering.webp",
    width: 370,
    height: 245,
  },
  {
    src: "/media/optimized/genomforbarhet-och-budget-studier.webp",
    width: 540,
    height: 367,
  },
  { src: "/media/optimized/hadi-headshot-hero.webp", width: 800, height: 878 },
  { src: "/media/optimized/hadi-headshot.webp", width: 640, height: 640 },
  { src: "/media/optimized/hero.webp", width: 1600, height: 1068 },
  { src: "/media/optimized/home-benefits.webp", width: 1600, height: 1067 },
  {
    src: "/media/optimized/investeringar-i-sverige.webp",
    width: 1024,
    height: 512,
  },
  { src: "/media/optimized/kontrakt-och-avtal.webp", width: 1024, height: 683 },
];
