import type { MetadataRoute } from "next";

import { business } from "@/content/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.brandName,
    short_name: business.brandName,
    start_url: "/",
    display: "standalone",
    background_color: "#f4f7fb",
    theme_color: "#20275e",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
