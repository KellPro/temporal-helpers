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
});
