import { describe, it, expect } from "vitest";
import { lastDayOfDecade } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfDecade", () => {
  it("returns last day of decade", () => {
    const date = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    const result = lastDayOfDecade(date);
    expect(result.year).toBe(2029);
    expect(result.month).toBe(12);
    expect(result.day).toBe(31);
    expect(result.millisecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.nanosecond).toBe(999);
  });

  it("handles year 1999", () => {
    const date = ZonedDateTime.from("1999-06-15T12:00:00[Europe/Paris]");
    const result = lastDayOfDecade(date);
    expect(result.year).toBe(1999);
  });

  it("completes sub-second precision", () => {
    const date = ZonedDateTime.from("2024-07-10T12:34:56.123456[Europe/Paris]");
    const result = lastDayOfDecade(date);
    expect(result.millisecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.nanosecond).toBe(999);
  });
});
