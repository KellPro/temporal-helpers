import { describe, it, expect } from "vitest";
import { lastDayOfWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns last day of week (Saturday by default)", () => {
    const result = lastDayOfWeek(date);
    expect(result.day).toBe(13);
    expect(result.dayOfWeek).toBe(6);
  });

  it("preserves end-of-day time", () => {
    const result = lastDayOfWeek(date);
    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
    expect(result.second).toBe(59);
    expect(result.nanosecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.millisecond).toBe(999);
  });

  it("returns the same week's Saturday for a Sunday input", () => {
    const sunday = ZonedDateTime.from("2024-07-14T10:00:00[Europe/Paris]");
    const result = lastDayOfWeek(sunday);
    expect(result.day).toBe(20);
    expect(result.dayOfWeek).toBe(6);
  });

  it("supports weekStartsOn: 1 (end = Sunday)", () => {
    const result = lastDayOfWeek(date, { weekStartsOn: 1 });
    expect(result.day).toBe(14);
    expect(result.dayOfWeek).toBe(7);
  });

  it("handles a Sunday input with weekStartsOn: 1 (same week's Sunday)", () => {
    const sunday = ZonedDateTime.from("2024-07-14T10:00:00[Europe/Paris]");
    const result = lastDayOfWeek(sunday, { weekStartsOn: 1 });
    expect(result.day).toBe(14);
    expect(result.dayOfWeek).toBe(7);
  });

  it("works in a non-UTC zone", () => {
    const newYork = ZonedDateTime.from("2024-07-10T20:30:00[America/New_York]");
    const result = lastDayOfWeek(newYork);
    expect(result.timeZoneId).toBe("America/New_York");
    expect(result.day).toBe(13);
    expect(result.dayOfWeek).toBe(6);
    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
    expect(result.second).toBe(59);
    expect(result.nanosecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.millisecond).toBe(999);
  });

  it("completes sub-second precision", () => {
    const date = ZonedDateTime.from("2024-07-10T12:34:56.123456[Europe/Paris]");
    const result = lastDayOfWeek(date);
    expect(result.millisecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.nanosecond).toBe(999);
  });
});
