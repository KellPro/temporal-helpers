import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { setDayOfYear } from "../index.js";

describe("setDayOfYear", () => {
  it("sets the day of the year", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setDayOfYear(date, 100);
    expect(result.dayOfYear).toBe(100);
  });

  it("wraps to next year if day is greater than days in year", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setDayOfYear(date, 400);
    expect(result.year).toBe(2025);
  });
});
