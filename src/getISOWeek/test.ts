import { describe, it, expect } from "vitest";
import { getISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getISOWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns ISO week", () => {
    expect(getISOWeek(date)).toBe(28);
  });

  it("returns the same week for a sub-second input as for the same input truncated to whole seconds", () => {
    const subSecond = ZonedDateTime.from("2024-07-10T14:30:45.123456789[Europe/Paris]");
    const wholeSecond = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    expect(getISOWeek(subSecond)).toBe(getISOWeek(wholeSecond));
  });

  it("returns week 1 for a sub-second January Monday", () => {
    expect(getISOWeek(ZonedDateTime.from("2024-01-01T00:00:00.123456789[Europe/Paris]"))).toBe(1);
  });

  it("numbers the week inside the date's ISO week-year", () => {
    // Anchoring January 4 of the calendar year reports 0 or the previous
    // week's number when January 4 is Fri/Sat/Sun, and when late December
    // already belongs to the next ISO year.
    const expectations: Array<[string, number]> = [
      ["2026-01-01T00:00:00[Europe/Paris]", 1],
      ["2021-01-01T00:00:00[America/New_York]", 53],
      ["2020-12-31T12:00:00[Europe/Paris]", 53],
      ["2015-12-31T00:00:00[UTC]", 53],
      ["2023-01-01T00:00:00[Europe/Paris]", 52],
      ["2024-12-30T00:00:00[UTC]", 1],
    ];
    for (const [iso, week] of expectations) {
      expect(getISOWeek(ZonedDateTime.from(iso))).toBe(week);
    }
  });
});
