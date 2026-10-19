import { SignJWT, jwtVerify } from "jose";

/**
 * Admin session token: an HS256 JWT signed with ADMIN_SESSION_SECRET. Kept
 * free of next/* imports so it can be unit tested directly.
 */

export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function key(secret: string): Uint8Array {
  if (secret.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 characters");
  }
  return new TextEncoder().encode(secret);
}

export async function signSessionToken(
  secret: string,
  ttlSeconds = SESSION_TTL_SECONDS,
): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ttlSeconds}s`)
    .sign(key(secret));
}

export async function verifySessionToken(
  token: string | undefined,
  secret: string,
): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, key(secret), {
      algorithms: ["HS256"],
    });
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/** Constant-time comparison so response timing doesn't leak how much of the password matched. */
export async function passwordMatches(
  candidate: string,
  expected: string,
): Promise<boolean> {
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(candidate)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  const left = new Uint8Array(a);
  const right = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < left.length; i++) diff |= left[i] ^ right[i];
  return diff === 0;
}
