import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { setISOWeekYear } from "../index.js";

describe("setISOWeekYear", () => {
  it("sets the ISO week year", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setISOWeekYear(date, 2025);
    expect(result.year).toBe(2025);
  });

  it("keeps the ISO week and weekday like date-fns", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = setISOWeekYear(date, 2025);
    expect(result.month).toBe(4);
    // Same ISO week/weekday position, so the calendar day can shift
    expect(result.day).toBe(9);
  });

  it("returns local midnight like date-fns (time of day is not preserved)", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = setISOWeekYear(date, 2025);
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
  });
});
