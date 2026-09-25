import { describe, it, expect } from "vitest";
import { eachWeekOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachWeekOfInterval", () => {
  it("returns array of weeks in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-21T10:00:00[Europe/Paris]"),
    };
    const result = eachWeekOfInterval(interval);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns single element for same week", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-07T10:00:00[Europe/Paris]"),
    };
    const result = eachWeekOfInterval(interval);
    expect(result.length).toBe(2);
  });

  it("strips sub-second residue from interval bounds", () => {
    const result = eachWeekOfInterval({
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
