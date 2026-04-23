import { describe, it, expect } from "vitest";
import { differenceInISOWeekYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInISOWeekYears", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns ISO week years between dates", () => {
    const nextYear = ZonedDateTime.from("2025-01-01T12:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(nextYear, date1)).toBe(1);
  });
});
