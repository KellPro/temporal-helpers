import { describe, it, expect } from "vitest";
import { endOfToday } from "../index.js";

describe("endOfToday", () => {
  it("returns end of today", () => {
    const result = endOfToday();
    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
    expect(result.second).toBe(59);
  });
});
