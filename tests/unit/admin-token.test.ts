import { describe, expect, it } from "vitest";

import {
  passwordMatches,
  signSessionToken,
  verifySessionToken,
} from "@/lib/admin/token";

const SECRET = "a".repeat(32);

describe("admin session token", () => {
  it("verifies a token it signed", async () => {
    const token = await signSessionToken(SECRET);
    expect(await verifySessionToken(token, SECRET)).toBe(true);
  });

  it("rejects a missing, tampered, or foreign-secret token", async () => {
    const token = await signSessionToken(SECRET);
    expect(await verifySessionToken(undefined, SECRET)).toBe(false);
    expect(await verifySessionToken(`${token}x`, SECRET)).toBe(false);
    expect(await verifySessionToken(token, "b".repeat(32))).toBe(false);
  });

  it("rejects an expired token", async () => {
    const token = await signSessionToken(SECRET, -10);
    expect(await verifySessionToken(token, SECRET)).toBe(false);
  });

  it("refuses short secrets", async () => {
    await expect(signSessionToken("short")).rejects.toThrow(/32/);
  });
});

describe("passwordMatches", () => {
  it("compares exactly", async () => {
    expect(await passwordMatches("hunter2", "hunter2")).toBe(true);
    expect(await passwordMatches("hunter", "hunter2")).toBe(false);
    expect(await passwordMatches("", "hunter2")).toBe(false);
  });
});
