import { describe, it, expect } from "vitest";
import { setWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("setWeekYear", () => {
  it("should set week year on a ZonedDateTime", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-15T10:30:00[America/New_York]");
    const result = setWeekYear(date, 2025);
    expect(result.year).toBe(2025);
  });

  it("keeps the local week and weekday when changing week-year", () => {
    // 2024-01-15 is Monday of Sunday-start week 3. Week 3 of 2025 starts
    // 2025-01-12, so the same weekday is 2025-01-13.
    const date = Temporal.ZonedDateTime.from("2024-01-15T10:30:00[America/New_York]");
    expect(setWeekYear(date, 2025).toString()).toBe(
      "2025-01-13T10:30:00-05:00[America/New_York]",
    );
  });

  it("should handle weekStartsOn option", () => {
    const date = Temporal.ZonedDateTime.from("2024-06-20T10:30:00[Europe/London]");
    const result = setWeekYear(date, 2023, { weekStartsOn: 1 });
    expect(result.year).toBe(2023);
  });
});
