import { describe, it, expect } from "vitest";
import { getWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getWeek", () => {
  it("returns week of year", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    const result = getWeek(date);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(53);
  });

  it("returns 1 for a December date in the week that contains next January 1", () => {
    expect(getWeek(ZonedDateTime.from("2024-12-30T12:00:00[UTC]"))).toBe(1);
    expect(getWeek(ZonedDateTime.from("2023-12-31T12:00:00[UTC]"))).toBe(1);
  });
});
