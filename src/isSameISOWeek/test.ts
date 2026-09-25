import { describe, it, expect } from "vitest";
import { isSameISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameISOWeek", () => {
  const monday1 = ZonedDateTime.from("2024-07-08T12:00:00[UTC]");
  const wednesday = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
  const friday = ZonedDateTime.from("2024-07-12T12:00:00[UTC]");
  const nextWeekMonday = ZonedDateTime.from("2024-07-15T12:00:00[UTC]");

  it("returns true for dates in the same ISO week", () => {
    expect(isSameISOWeek(monday1, wednesday)).toBe(true);
    expect(isSameISOWeek(monday1, friday)).toBe(true);
  });

  it("returns false for dates in different ISO weeks", () => {
    expect(isSameISOWeek(monday1, nextWeekMonday)).toBe(false);
  });

  it("treats a January date and the previous December as the same ISO week when they share a Thursday", () => {
    // Friday 2021-01-01 and Thursday 2020-12-31 are both ISO week 53 of 2020.
    const january = ZonedDateTime.from("2021-01-01T00:00:00[America/New_York]");
    const december = ZonedDateTime.from("2020-12-31T12:00:00[America/New_York]");
    expect(isSameISOWeek(january, december)).toBe(true);
  });
});
