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
});
