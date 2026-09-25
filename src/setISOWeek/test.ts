import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { setISOWeek, getISOWeek } from "../index.js";

describe("setISOWeek", () => {
  it("sets the ISO week", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setISOWeek(date, 25);
    expect(getISOWeek(result)).toBe(25);
  });

  it("preserves other date components", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = setISOWeek(date, 1);
    expect(result.year).toBe(2024);
    expect(result.hour).toBe(14);
    expect(result.minute).toBe(30);
  });

  it("keeps a date that is already in the requested ISO week", () => {
    // 2021-01-01 is Friday of ISO week 53 of 2020. Moving by a mis-numbered
    // current week lands a year later.
    const date = Temporal.ZonedDateTime.from("2021-01-01T08:15:30[America/New_York]");
    expect(setISOWeek(date, 53).toString()).toBe(
      "2021-01-01T08:15:30-05:00[America/New_York]",
    );

    const nextYearWeekOne = Temporal.ZonedDateTime.from("2024-12-30T12:00:00[UTC]");
    expect(setISOWeek(nextYearWeekOne, 1).toString()).toBe(
      "2024-12-30T12:00:00+00:00[UTC]",
    );
  });
});
