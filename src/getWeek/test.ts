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
});
