/**
 * Minimal in-memory rate limit for the contact form. Resets on cold start
 * and isn't shared across serverless instances -- an intentional, pragmatic
 * limitation for a low-traffic B2B marketing site. Revisit with a shared
 * store (e.g. Upstash/KV) only if real abuse shows up.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter(
    (t) => now - t < WINDOW_MS,
  );
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
