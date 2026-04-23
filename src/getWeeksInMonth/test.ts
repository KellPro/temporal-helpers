import { describe, it, expect } from "vitest";
import { getWeeksInMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getWeeksInMonth", () => {
  const date = ZonedDateTime.from("2024-07-15T12:00:00[UTC]");

  it("returns the number of weeks in the month", () => {
    const result = getWeeksInMonth(date);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThan(0);
  });

  it("returns a positive integer", () => {
    expect(Number.isInteger(getWeeksInMonth(date))).toBe(true);
  });
});
