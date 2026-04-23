import { describe, it, expect } from "vitest";
import { getWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getWeekYear", () => {
  const date = ZonedDateTime.from("2024-07-15T12:00:00[UTC]");

  it("returns the week year", () => {
    const result = getWeekYear(date);
    expect(typeof result).toBe("number");
  });

  it("returns the correct year for a date in the middle of the year", () => {
    const midYear = ZonedDateTime.from("2024-06-15T12:00:00[UTC]");
    expect(getWeekYear(midYear)).toBe(2023);
  });
});
