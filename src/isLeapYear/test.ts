import { describe, it, expect } from "vitest";
import { isLeapYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isLeapYear", () => {
  it("returns true for leap year", () => {
    const leapYear = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(isLeapYear(leapYear)).toBe(true);
  });

  it("returns false for non-leap year", () => {
    const nonLeapYear = ZonedDateTime.from("2023-07-10T12:00:00[Europe/Paris]");
    expect(isLeapYear(nonLeapYear)).toBe(false);
  });
});
