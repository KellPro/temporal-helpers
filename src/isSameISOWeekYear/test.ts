import { describe, it, expect } from "vitest";
import { isSameISOWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameISOWeekYear", () => {
  const date1 = ZonedDateTime.from("2024-07-08T12:00:00[UTC]");
  const sameYearDate = ZonedDateTime.from("2024-12-31T12:00:00[UTC]");
  const diffYearDate = ZonedDateTime.from("2025-01-01T12:00:00[UTC]");

  it("returns true for dates in the same ISO week year", () => {
    expect(isSameISOWeekYear(date1, sameYearDate)).toBe(true);
  });

  it("returns false for dates in different ISO week years", () => {
    expect(isSameISOWeekYear(date1, diffYearDate)).toBe(false);
  });
});
