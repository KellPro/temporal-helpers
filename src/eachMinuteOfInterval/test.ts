import { describe, it, expect } from "vitest";
import { eachMinuteOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachMinuteOfInterval", () => {
  it("returns array of minutes in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-01T10:05:00[Europe/Paris]"),
    };
    const result = eachMinuteOfInterval(interval);
    expect(result.length).toBe(6);
  });

  it("returns single element for same start and end", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
    };
    const result = eachMinuteOfInterval(interval);
    expect(result.length).toBe(1);
  });

  it("zeroes sub-second residue from emitted boundaries", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00.123456789[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-01T10:05:00.123456789[Europe/Paris]"),
    };
    const result = eachMinuteOfInterval(interval);
    expect(result.length).toBe(6);
    for (const boundary of result) {
      expect(boundary.millisecond).toBe(0);
      expect(boundary.microsecond).toBe(0);
      expect(boundary.nanosecond).toBe(0);
    }
  });
});
