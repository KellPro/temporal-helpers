import { describe, it, expect } from "vitest";
import { differenceInCalendarYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInCalendarYears", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns calendar years between dates", () => {
    const nextYear = ZonedDateTime.from("2025-07-10T12:00:00[Europe/Paris]");
    expect(differenceInCalendarYears(nextYear, date1)).toBe(1);
  });
});
