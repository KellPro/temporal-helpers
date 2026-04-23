import { describe, it, expect } from "vitest";
import { eachWeekendOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachWeekendOfMonth", () => {
  it("returns array of weekend days in month", () => {
    const date = ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]");
    const result = eachWeekendOfMonth(date);
    expect(result.length).toBeGreaterThan(0);
  });

  it("returns weekend days from July 2024", () => {
    const date = ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]");
    const result = eachWeekendOfMonth(date);
    expect(result[0].dayOfWeek).toBe(6);
  });
});
