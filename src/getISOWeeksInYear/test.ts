import { describe, it, expect } from "vitest";
import { getISOWeeksInYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getISOWeeksInYear", () => {
  it("returns ISO weeks in year", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    const result = getISOWeeksInYear(date);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(53);
  });

  it("returns the same count for a sub-second input as for the same input truncated to whole seconds", () => {
    const subSecond = ZonedDateTime.from("2020-06-15T12:00:00.123456789[Europe/Paris]");
    const wholeSecond = ZonedDateTime.from("2020-06-15T12:00:00[Europe/Paris]");
    expect(getISOWeeksInYear(subSecond)).toBe(getISOWeeksInYear(wholeSecond));
  });
});
