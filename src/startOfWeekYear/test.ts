import { describe, it, expect } from "vitest";
import { startOfWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("startOfWeekYear", () => {
  it("should return start of week year", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-15T10:30:00[America/New_York]");
    const result = startOfWeekYear(date);
    expect(result.day).toBe(31);
    expect(result.month).toBe(12);
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect(result.nanosecond).toBe(0);
  });

  it("should handle weekStartsOn option", () => {
    const date = Temporal.ZonedDateTime.from("2024-06-20T10:30:00[Europe/London]");
    const result = startOfWeekYear(date, { weekStartsOn: 1 });
    expect(result.day).toBe(1);
    expect(result.month).toBe(1);
  });
});
