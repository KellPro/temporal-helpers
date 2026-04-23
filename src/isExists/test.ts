import { describe, it, expect } from "vitest";
import { isExists } from "../index.js";

describe("isExists", () => {
  it("returns true for a valid date", () => {
    expect(isExists(2024, 7, 15)).toBe(true);
  });

  it("returns true for leap day in leap year", () => {
    expect(isExists(2024, 2, 29)).toBe(true);
  });

  it("returns false for Feb 29 in non-leap year", () => {
    expect(isExists(2023, 2, 29)).toBe(false);
  });

  it("returns false for invalid month", () => {
    expect(isExists(2024, 13, 1)).toBe(false);
  });

  it("returns false for invalid day", () => {
    expect(isExists(2024, 2, 30)).toBe(false);
  });

  it("returns false for day 0", () => {
    expect(isExists(2024, 1, 0)).toBe(false);
  });
});
