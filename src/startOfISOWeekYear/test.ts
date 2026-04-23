import { describe, it, expect } from "vitest";
import { startOfISOWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("startOfISOWeekYear", () => {
  it("should return start of ISO week year", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-15T10:30:00[America/New_York]");
    const result = startOfISOWeekYear(date);
    expect(result.day).toBe(1);
    expect(result.month).toBe(1);
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect(result.nanosecond).toBe(0);
  });

  it("should handle date in January", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-10T10:30:00[Europe/London]");
    const result = startOfISOWeekYear(date);
    expect(result.day).toBe(1);
    expect(result.month).toBe(1);
  });
});
