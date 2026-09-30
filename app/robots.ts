import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

// Already allowed by the blanket "*" rule below -- listed explicitly so the
// allowance is documented/auditable for AI answer/generative engines. Each
// entry repeats the full allow/disallow pair since robots.txt parsers apply
// only the most-specific matching user-agent block, not an additive merge.
const AI_CRAWLER_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "CCBot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
