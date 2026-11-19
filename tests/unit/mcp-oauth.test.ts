import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import { signSessionToken, verifySessionToken } from "@/lib/admin/token";
import {
  isAllowedRedirectUri,
  isStaticClientRedirectUri,
  issueTokens,
  pkceMatches,
  resolveClient,
  signAuthCode,
  signClientId,
  STATIC_CLIENT_ID,
  staticClientSecret,
  verifyAccessToken,
  verifyAuthCode,
  verifyClientId,
  verifyRefreshToken,
} from "@/lib/mcp/oauth";

const SECRET = "mcp-test-secret-0123456789-abcdefghij";
const OTHER = "another-secret-0123456789-abcdefghijkl";
const RESOURCE = "https://example.com/api/mcp";

const verifier = "a".repeat(43) + "-._~xyz";
const challenge = createHash("sha256")
  .update(verifier)
  .digest("base64")
  .replace(/\+/g, "-")
  .replace(/\//g, "_")
  .replace(/=+$/, "");

describe("MCP OAuth tokens", () => {
  it("round-trips a registered client", async () => {
    const clientId = await signClientId(SECRET, {
      redirectUris: ["https://chatgpt.com/connector_platform_oauth_redirect"],
      clientName: "ChatGPT",
    });
    expect(await verifyClientId(clientId, SECRET)).toEqual({
      redirectUris: ["https://chatgpt.com/connector_platform_oauth_redirect"],
      clientName: "ChatGPT",
    });
    expect(await verifyClientId(clientId, OTHER)).toBeNull();
  });

  it("checks PKCE S256", async () => {
    expect(await pkceMatches(verifier, challenge)).toBe(true);
    expect(await pkceMatches(verifier + "x", challenge)).toBe(false);
    expect(await pkceMatches("short", challenge)).toBe(false);
    expect(await pkceMatches(undefined, challenge)).toBe(false);
  });

  it("round-trips an authorization code", async () => {
    const code = {
      clientId: "client",
      redirectUri: "https://example.org/cb",
      codeChallenge: challenge,
      resource: RESOURCE,
    };
    const signed = await signAuthCode(SECRET, code);
    expect(await verifyAuthCode(signed, SECRET)).toEqual(code);
    expect(await verifyAuthCode(signed, OTHER)).toBeNull();
  });

  it("keeps token kinds apart", async () => {
    const tokens = await issueTokens(SECRET, {
      clientId: "client",
      resource: RESOURCE,
    });
    expect(await verifyAccessToken(tokens.access_token, SECRET, RESOURCE)).toBe(
      true,
    );
    // Wrong audience, secret or kind.
    expect(
      await verifyAccessToken(
        tokens.access_token,
        SECRET,
        "https://evil.example/api/mcp",
      ),
    ).toBe(false);
    expect(await verifyAccessToken(tokens.access_token, OTHER, RESOURCE)).toBe(
      false,
    );
    expect(
      await verifyAccessToken(tokens.refresh_token, SECRET, RESOURCE),
    ).toBe(false);
    expect(await verifyRefreshToken(tokens.access_token, SECRET)).toBeNull();
    expect(await verifyRefreshToken(tokens.refresh_token, SECRET)).toEqual({
      clientId: "client",
      resource: RESOURCE,
    });

    const clientId = await signClientId(SECRET, {
      redirectUris: ["https://x.test/cb"],
      clientName: "x",
    });
    expect(await verifyAccessToken(clientId, SECRET, RESOURCE)).toBe(false);
    expect(await verifyAuthCode(tokens.access_token, SECRET)).toBeNull();
  });

  it("never accepts an MCP token as a dashboard session, or the reverse", async () => {
    const tokens = await issueTokens(SECRET, {
      clientId: "client",
      resource: RESOURCE,
    });
    expect(await verifySessionToken(tokens.access_token, OTHER)).toBe(false);
    const session = await signSessionToken(SECRET);
    expect(await verifyAccessToken(session, SECRET, RESOURCE)).toBe(false);
  });

  it("rejects expired tokens", async () => {
    const code = await signAuthCode(SECRET, {
      clientId: "c",
      redirectUri: "https://x.test/cb",
      codeChallenge: challenge,
      resource: RESOURCE,
    });
    const [header, payload, signature] = code.split(".");
    const tampered = JSON.parse(Buffer.from(payload, "base64url").toString());
    tampered.exp = 1;
    const forged = [
      header,
      Buffer.from(JSON.stringify(tampered)).toString("base64url"),
      signature,
    ].join(".");
    expect(await verifyAuthCode(forged, SECRET)).toBeNull();
  });

  it("only allows https redirects, or http on loopback", () => {
    expect(isAllowedRedirectUri("https://chatgpt.com/cb")).toBe(true);
    expect(isAllowedRedirectUri("http://localhost:6274/oauth/callback")).toBe(
      true,
    );
    expect(isAllowedRedirectUri("http://127.0.0.1:3000/cb")).toBe(true);
    expect(isAllowedRedirectUri("http://example.com/cb")).toBe(false);
    expect(isAllowedRedirectUri("javascript:alert(1)")).toBe(false);
    expect(isAllowedRedirectUri("https://x.test/cb#frag")).toBe(false);
    expect(isAllowedRedirectUri("not a url")).toBe(false);
  });

  it("refuses short secrets", async () => {
    await expect(
      signClientId("short", { redirectUris: [], clientName: "" }),
    ).rejects.toThrow();
  });
});

describe("MCP fixed client (dashboard credentials)", () => {
  it("derives a stable secret that changes with MCP_OAUTH_SECRET", async () => {
    const first = await staticClientSecret(SECRET);
    expect(first).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(await staticClientSecret(SECRET)).toBe(first);
    expect(await staticClientSecret(OTHER)).not.toBe(first);
  });

  it("resolves the fixed client and registered clients", async () => {
    const fixed = await resolveClient(STATIC_CLIENT_ID, SECRET);
    expect(fixed?.isStatic).toBe(true);
    expect(
      fixed?.allowsRedirect("https://claude.ai/api/mcp/auth_callback"),
    ).toBe(true);
    expect(fixed?.allowsRedirect("https://evil.com/callback")).toBe(false);

    const clientId = await signClientId(SECRET, {
      redirectUris: ["https://app.example/cb"],
      clientName: "Test",
    });
    const registered = await resolveClient(clientId, SECRET);
    expect(registered?.isStatic).toBe(false);
    expect(registered?.allowsRedirect("https://app.example/cb")).toBe(true);
    expect(
      registered?.allowsRedirect("https://claude.ai/api/mcp/auth_callback"),
    ).toBe(false);

    expect(await resolveClient("unknown", SECRET)).toBeNull();
    expect(await resolveClient(null, SECRET)).toBeNull();
  });

  it("only lets the fixed client redirect to Claude, ChatGPT or loopback", () => {
    expect(
      isStaticClientRedirectUri("https://claude.ai/api/mcp/auth_callback"),
    ).toBe(true);
    expect(
      isStaticClientRedirectUri("https://claude.com/api/mcp/auth_callback"),
    ).toBe(true);
    expect(
      isStaticClientRedirectUri(
        "https://chatgpt.com/connector_platform_oauth_redirect",
      ),
    ).toBe(true);
    expect(
      isStaticClientRedirectUri("http://localhost:6274/oauth/callback"),
    ).toBe(true);
    expect(
      isStaticClientRedirectUri("http://claude.ai/api/mcp/auth_callback"),
    ).toBe(false);
    expect(isStaticClientRedirectUri("https://evil.com/callback")).toBe(false);
    expect(isStaticClientRedirectUri("https://claude.ai.evil.com/cb")).toBe(
      false,
    );
    expect(isStaticClientRedirectUri("not a url")).toBe(false);
  });
});
