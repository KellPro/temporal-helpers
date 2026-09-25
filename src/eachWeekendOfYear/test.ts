import { describe, it, expect } from "vitest";
import { eachWeekendOfYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachWeekendOfYear", () => {
  it("returns array of weekend days in year", () => {
    const date = ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]");
    const result = eachWeekendOfYear(date);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns Saturdays and Sundays", () => {
    const date = ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]");
    const result = eachWeekendOfYear(date);
    // 2024-01-01 is Monday and 2024-12-31 is Tuesday: 52 Saturdays and 52 Sundays.
    expect(result).toHaveLength(104);
    expect(result.some((day) => day.dayOfWeek === 7)).toBe(true);
    expect(result.every((day) => day.dayOfWeek === 6 || day.dayOfWeek === 7)).toBe(true);
  });
});
