import { describe, it, expect } from "vitest";
import { clamp } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("clamp", () => {
  it("returns the date when it is within the interval", () => {
    const date = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
    };
    const result = clamp(date, interval);
    expect(result.day).toBe(5);
  });

  it("returns the start when date is before the interval", () => {
    const date = ZonedDateTime.from("2024-06-15T10:00:00[Europe/Paris]");
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
    };
    const result = clamp(date, interval);
    expect(result.day).toBe(1);
  });

  it("returns the end when date is after the interval", () => {
    const date = ZonedDateTime.from("2024-07-20T10:00:00[Europe/Paris]");
    const interval = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
    };
    const result = clamp(date, interval);
    expect(result.day).toBe(10);
  });
});
