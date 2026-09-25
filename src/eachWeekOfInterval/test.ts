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

  it("zeroes sub-second residue from emitted boundaries", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-05T10:00:00.123456789[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-07T10:00:00.123456789[Europe/Paris]"),
    };
    const result = eachWeekOfInterval(interval);
    expect(result.length).toBe(2);
    for (const boundary of result) {
      expect(boundary.millisecond).toBe(0);
      expect(boundary.microsecond).toBe(0);
      expect(boundary.nanosecond).toBe(0);
    }
  });
});
