import { describe, it, expect } from "vitest";
import { isSameQuarter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameQuarter", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
  const sameQuarter = ZonedDateTime.from("2024-08-15T12:00:00[UTC]");
  const diffQuarter = ZonedDateTime.from("2024-10-10T12:00:00[UTC]");

  it("returns true for dates in the same quarter", () => {
    expect(isSameQuarter(date1, sameQuarter)).toBe(true);
  });

  it("returns false for dates in different quarters", () => {
    expect(isSameQuarter(date1, diffQuarter)).toBe(false);
  });

  it("returns true for dates at quarter boundaries", () => {
    const endOfQ2 = ZonedDateTime.from("2024-06-30T23:59:59[UTC]");
    const startOfQ3 = ZonedDateTime.from("2024-07-01T00:00:00[UTC]");
    expect(isSameQuarter(endOfQ2, startOfQ3)).toBe(false);
  });
});
