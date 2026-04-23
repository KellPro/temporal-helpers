import { describe, it, expect } from "vitest";
import { getOverlappingDaysInIntervals } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getOverlappingDaysInIntervals", () => {
  it("returns overlapping days between intervals", () => {
    const interval1 = {
      start: ZonedDateTime.from("2024-01-01T00:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-01-10T23:59:59[Europe/Paris]"),
    };
    const interval2 = {
      start: ZonedDateTime.from("2024-01-05T00:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-01-15T23:59:59[Europe/Paris]"),
    };
    const result = getOverlappingDaysInIntervals(interval1, interval2);
    expect(result).toBeGreaterThan(0);
  });

  it("returns 0 for non-overlapping intervals", () => {
    const interval1 = {
      start: ZonedDateTime.from("2024-01-01T00:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-01-05T23:59:59[Europe/Paris]"),
    };
    const interval2 = {
      start: ZonedDateTime.from("2024-01-10T00:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-01-15T23:59:59[Europe/Paris]"),
    };
    expect(getOverlappingDaysInIntervals(interval1, interval2)).toBe(0);
  });
});
