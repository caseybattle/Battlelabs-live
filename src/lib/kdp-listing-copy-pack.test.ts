import { describe, expect, it } from "vitest";
import { kdpListingCopyPack } from "./kdp-listing-copy-pack";

const RISKY_PATTERNS = [
  /\bpassive income\b/i,
  /\bget rich\b/i,
  /\b1000x\b/i,
  /\bmake\s+\$?\d+[,\d]*/i,
] as const;

describe("kdp listing copy pack offer", () => {
  it("includes the required no-guarantee disclaimer phrase", () => {
    expect(kdpListingCopyPack.disclaimer).toMatch(/No sales or ranking results are guaranteed/i);
  });

  it("avoids risky earnings or ranking claims in offer text", () => {
    const text = [
      kdpListingCopyPack.angle,
      kdpListingCopyPack.promise,
      kdpListingCopyPack.disclaimer,
      kdpListingCopyPack.audience,
      ...kdpListingCopyPack.deliverables,
      ...kdpListingCopyPack.compliance,
    ].join("\n");

    for (const pattern of RISKY_PATTERNS) {
      expect(text).not.toMatch(pattern);
    }

    const guaranteeMatches = Array.from(text.matchAll(/\bguarantee(?:d|s)?\b/gi));
    for (const match of guaranteeMatches) {
      const index = match.index ?? 0;
      const context = text.slice(Math.max(0, index - 40), index + match[0].length + 80);
      expect(context).toMatch(/\b(no|not|without|does not|do not|cannot|never)\b/i);
    }
  });

  it("includes platform compliance and AI disclosure reminders", () => {
    const text = kdpListingCopyPack.compliance.join("\n");
    expect(text).toMatch(/platform rules/i);
    expect(text).toMatch(/AI-assisted|AI-content disclosure|Disclose AI/i);
  });
});
