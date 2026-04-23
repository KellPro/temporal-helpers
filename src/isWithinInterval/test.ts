import { describe, it, expect } from "vitest";
import { isWithinInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isWithinInterval", () => {
  it("returns true for date within interval", () => {
    const date = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    const interval = {
      start: ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-01-20T12:00:00[Europe/Paris]"),
    };
    expect(isWithinInterval(date, interval)).toBe(true);
  });

  it("returns false for date outside interval", () => {
    const date = ZonedDateTime.from("2024-01-25T12:00:00[Europe/Paris]");
    const interval = {
      start: ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-01-20T12:00:00[Europe/Paris]"),
    };
    expect(isWithinInterval(date, interval)).toBe(false);
  });
});
