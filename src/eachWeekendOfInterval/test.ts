import { describe, it, expect } from "vitest";
import { eachWeekendOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachWeekendOfInterval", () => {
  it("returns array of weekend days in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-07T10:00:00[Europe/Paris]"),
    };
    const result = eachWeekendOfInterval(interval);
    // Sat Jul 6 and Sun Jul 7. Sunday is Temporal dayOfWeek 7.
    expect(result.map((day) => day.toString())).toEqual([
      "2024-07-06T00:00:00+02:00[Europe/Paris]",
      "2024-07-07T00:00:00+02:00[Europe/Paris]",
    ]);
    expect(result.map((day) => day.dayOfWeek)).toEqual([6, 7]);
  });

  it("returns empty array when no weekends in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-08T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
    };
    const result = eachWeekendOfInterval(interval);
    expect(result.length).toBe(0);
  });

  it("strips sub-second residue from interval bounds", () => {
    const result = eachWeekendOfInterval({
      start: ZonedDateTime.from("2024-07-12T12:34:56.789123456[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-15T08:09:10.111222333[Europe/Paris]"),
    });
    expect(result.length).toBeGreaterThan(0);
    for (const value of result) {
      expect(value.millisecond).toBe(0);
      expect(value.microsecond).toBe(0);
      expect(value.nanosecond).toBe(0);
    }
  });
});
