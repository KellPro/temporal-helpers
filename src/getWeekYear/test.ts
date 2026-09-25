import { describe, it, expect } from "vitest";
import { getWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getWeekYear", () => {
  const date = ZonedDateTime.from("2024-07-15T12:00:00[UTC]");

  it("returns the week year", () => {
    const result = getWeekYear(date);
    expect(typeof result).toBe("number");
  });

  it("returns the correct year for a date in the middle of the year", () => {
    // Sunday-start week year: the week containing January 1. June 2024 is
    // week-year 2024, even though that week starts on 2023-12-31.
    const midYear = ZonedDateTime.from("2024-06-15T12:00:00[UTC]");
    expect(getWeekYear(midYear)).toBe(2024);
  });

  it("assigns late December to the next week-year when that week contains January 1", () => {
    expect(getWeekYear(ZonedDateTime.from("2024-12-30T12:00:00[UTC]"))).toBe(2025);
    expect(getWeekYear(ZonedDateTime.from("2023-12-31T12:00:00[UTC]"))).toBe(2024);
  });

  it("keeps January 1 in its own week-year", () => {
    expect(getWeekYear(ZonedDateTime.from("2024-01-01T12:00:00[UTC]"))).toBe(2024);
  });
});
