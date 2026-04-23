import { describe, it, expect } from "vitest";
import { lastDayOfYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns last day of year", () => {
    const result = lastDayOfYear(date);
    expect(result.month).toBe(12);
    expect(result.day).toBe(31);
  });
});
