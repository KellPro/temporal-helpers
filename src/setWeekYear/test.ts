import { describe, it, expect } from "vitest";
import { setWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("setWeekYear", () => {
  it("should set week year on a ZonedDateTime", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-15T10:30:00[America/New_York]");
    const result = setWeekYear(date, 2025);
    expect(result.year).toBe(2025);
  });

  it("should handle weekStartsOn option", () => {
    const date = Temporal.ZonedDateTime.from("2024-06-20T10:30:00[Europe/London]");
    const result = setWeekYear(date, 2023, { weekStartsOn: 1 });
    expect(result.year).toBe(2023);
  });
});
