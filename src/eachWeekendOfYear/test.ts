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

  it("returns weekend days with dayOfWeek 0 or 6", () => {
    const date = ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]");
    const result = eachWeekendOfYear(date);
    const allWeekendDays = result.every((d) => d.dayOfWeek === 0 || d.dayOfWeek === 6);
    expect(allWeekendDays).toBe(true);
  });
});
