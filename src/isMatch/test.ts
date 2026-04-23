import { describe, it, expect } from "vitest";
import { isMatch } from "../index.js";

describe("isMatch", () => {
  it("returns true for valid ISO date string", () => {
    expect(isMatch("2024-07-10", "yyyy-MM-dd")).toBe(true);
  });

  it("returns true for date string with timezone", () => {
    expect(isMatch("2024-07-10T12:00:00[UTC]", "yyyy-MM-dd")).toBe(true);
  });

  it("returns false for invalid date string", () => {
    expect(isMatch("not-a-date", "yyyy-MM-dd")).toBe(false);
  });

  it("returns false for invalid format", () => {
    expect(isMatch("2024-13-01", "yyyy-MM-dd")).toBe(false);
  });
});
