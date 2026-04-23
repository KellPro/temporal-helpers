import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { setISOWeekYear } from "../index.js";

describe("setISOWeekYear", () => {
  it("sets the ISO week year", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setISOWeekYear(date, 2025);
    expect(result.year).toBe(2025);
  });

  it("preserves other date components", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = setISOWeekYear(date, 2025);
    expect(result.month).toBe(4);
    expect(result.day).toBe(10);
    expect(result.hour).toBe(14);
    expect(result.minute).toBe(30);
  });
});
