import { describe, it, expect } from "vitest";
import { getWeekOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getWeekOfMonth", () => {
  const date = ZonedDateTime.from("2024-07-15T12:00:00[UTC]");

  it("returns the week of the month", () => {
    const result = getWeekOfMonth(date);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  it("returns week 1 for first day of month", () => {
    const firstDay = ZonedDateTime.from("2024-07-01T12:00:00[UTC]");
    expect(getWeekOfMonth(firstDay)).toBe(1);
  });
});
