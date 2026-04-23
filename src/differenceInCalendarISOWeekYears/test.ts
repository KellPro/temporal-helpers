import { describe, it, expect } from "vitest";
import { differenceInCalendarISOWeekYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInCalendarISOWeekYears", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns calendar ISO week years between dates", () => {
    const nextYear = ZonedDateTime.from("2025-01-01T12:00:00[Europe/Paris]");
    expect(differenceInCalendarISOWeekYears(nextYear, date1)).toBe(1);
  });
});
