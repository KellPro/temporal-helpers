import { describe, it, expect } from "vitest";
import { lastDayOfISOWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfISOWeekYear", () => {
  it("returns last day of ISO week year", () => {
    const date = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    const result = lastDayOfISOWeekYear(date);
    expect(result.year).toBe(2025);
    expect(result.day).toBe(5);
    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
  });

  it("handles end of year", () => {
    const date = ZonedDateTime.from("2024-12-30T12:00:00[Europe/Paris]");
    const result = lastDayOfISOWeekYear(date);
    expect(result.year).toBe(2025);
  });
});
