import { describe, it, expect } from "vitest";
import { eachWeekOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

function weekStartDates(weeks: Temporal.ZonedDateTime[]): string[] {
  return weeks.map((week) => week.toString().slice(0, 10));
}

describe("eachWeekOfInterval", () => {
  it("returns array of weeks in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-21T10:00:00[Europe/Paris]"),
    };
    const result = eachWeekOfInterval(interval);
    expect(weekStartDates(result)).toEqual([
      "2024-06-30",
      "2024-07-07",
      "2024-07-14",
      "2024-07-21",
    ]);
  });

  it("returns single element for same week", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-07T10:00:00[Europe/Paris]"),
    };
    const result = eachWeekOfInterval(interval);
    expect(result.length).toBe(2);
  });

  it("does not include a week starting after the interval end", () => {
    const interval = {
      start: ZonedDateTime.from("2026-09-01T00:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2026-09-30T23:59:59[Europe/Paris]"),
    };
    const result = eachWeekOfInterval(interval);
    expect(weekStartDates(result)).toEqual([
      "2026-08-30",
      "2026-09-06",
      "2026-09-13",
      "2026-09-20",
      "2026-09-27",
    ]);
    expect(weekStartDates(result)).not.toContain("2026-10-04");
  });

  it("includes the week containing an end that falls mid-week", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-25T15:00:00[Europe/Paris]"),
    };
    expect(weekStartDates(eachWeekOfInterval(interval))).toEqual([
      "2024-07-07",
      "2024-07-14",
      "2024-07-21",
    ]);
  });

  it("emits week starts for an interval already aligned to week starts", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-07T00:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-21T00:00:00[Europe/Paris]"),
    };
    expect(weekStartDates(eachWeekOfInterval(interval))).toEqual([
      "2024-07-07",
      "2024-07-14",
      "2024-07-21",
    ]);
  });

  it("supports weekStartsOn in a non-UTC zone", () => {
    const interval = {
      start: ZonedDateTime.from("2026-09-04T12:00:00[America/New_York]"),
      end: ZonedDateTime.from("2026-09-29T09:00:00[America/New_York]"),
    };
    expect(
      weekStartDates(eachWeekOfInterval(interval, { weekStartsOn: 1 })),
    ).toEqual([
      "2026-08-31",
      "2026-09-07",
      "2026-09-14",
      "2026-09-21",
      "2026-09-28",
    ]);
  });

  it("throws when start is after end", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-21T00:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-14T00:00:00[Europe/Paris]"),
    };
    expect(() => eachWeekOfInterval(interval)).toThrow(RangeError);
  });

  it("allows an interval where start equals end", () => {
    const instant = ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]");
    const interval = { start: instant, end: instant };
    expect(weekStartDates(eachWeekOfInterval(interval))).toEqual(["2024-07-07"]);
  });
});
