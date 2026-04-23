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
    expect(result.length).toBe(1);
  });

  it("returns empty array when no weekends in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-07-08T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
    };
    const result = eachWeekendOfInterval(interval);
    expect(result.length).toBe(0);
  });
});
