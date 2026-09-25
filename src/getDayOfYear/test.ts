import { describe, it, expect } from "vitest";
import { getDayOfYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getDayOfYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns day of year", () => {
    expect(getDayOfYear(date)).toBe(192);
  });

  it("returns the same day for a sub-second input as for the same input truncated to whole seconds", () => {
    const subSecond = ZonedDateTime.from("2024-07-10T14:30:45.123456789[Europe/Paris]");
    const wholeSecond = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    expect(getDayOfYear(subSecond)).toBe(getDayOfYear(wholeSecond));
  });

  it("returns 1 for a sub-second January 1 midnight", () => {
    expect(getDayOfYear(ZonedDateTime.from("2024-01-01T00:00:00.123456789[Europe/Paris]"))).toBe(1);
  });
});
