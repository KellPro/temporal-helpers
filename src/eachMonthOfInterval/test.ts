import { describe, it, expect } from "vitest";
import { eachMonthOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachMonthOfInterval", () => {
  it("returns array of months in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-01-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-04-01T10:00:00[Europe/Paris]"),
    };
    const result = eachMonthOfInterval(interval);
    expect(result.length).toBe(4);
  });

  it("returns single element for same month", () => {
    const interval = {
      start: ZonedDateTime.from("2024-03-15T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-03-20T10:00:00[Europe/Paris]"),
    };
    const result = eachMonthOfInterval(interval);
    expect(result.length).toBe(1);
    expect(result[0].month).toBe(3);
  });

  it("strips sub-second residue from interval bounds", () => {
    const result = eachMonthOfInterval({
      start: ZonedDateTime.from("2024-07-10T12:34:56.789123456[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-12T08:09:10.111222333[Europe/Paris]"),
    });
    expect(result.length).toBeGreaterThan(0);
    for (const value of result) {
      expect(value.millisecond).toBe(0);
      expect(value.microsecond).toBe(0);
      expect(value.nanosecond).toBe(0);
    }
  });
});
