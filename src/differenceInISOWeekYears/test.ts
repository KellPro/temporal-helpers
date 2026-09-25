import { describe, it, expect } from "vitest";
import { differenceInISOWeekYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInISOWeekYears", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns ISO week years between dates", () => {
    const nextYear = ZonedDateTime.from("2025-07-10T12:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(nextYear, date1)).toBe(1);
  });

  it("returns negative ISO week years when reversed", () => {
    const nextYear = ZonedDateTime.from("2025-07-10T12:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(date1, nextYear)).toBe(-1);
  });

  it("the difference is less than an ISO year, but the given dates are in different ISO week years", () => {
    // Jan 1 2025 is in ISO week year 2025, but only ~half an ISO year after
    // Jul 10 2024
    const later = ZonedDateTime.from("2025-01-01T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(later, earlier)).toBe(0);
  });

  it("the same for the swapped dates", () => {
    const later = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2025-01-01T12:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(later, earlier)).toBe(0);
  });

  it("counts an exact 364-day ISO week year span with a time of day as 1", () => {
    // Thu of week 28 2024 22:00 -> Thu of week 28 2025 22:00 = one exact ISO
    // week year; date-fns reports 0 here because setISOWeekYear resets to
    // midnight and the fullness check then misfires
    const later = ZonedDateTime.from("2025-07-10T22:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-11T22:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(later, earlier)).toBe(1);
  });

  it("returns 0, not -0, for the same instant", () => {
    const result = differenceInISOWeekYears(date1, date1);
    expect(result).toBe(0);
    expect(Object.is(result, -0)).toBe(false);
  });

  it("returns 0 for two times on the same day in one ISO week year", () => {
    const later = ZonedDateTime.from("2024-07-10T18:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(later, earlier)).toBe(0);
  });

  it("returns 0 for that same-day pair reversed", () => {
    const later = ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T18:00:00[Europe/Paris]");
    expect(differenceInISOWeekYears(later, earlier)).toBe(0);
  });

  it("returns 0 when mixed-zone instants are hours apart inside one ISO week year", () => {
    const later = ZonedDateTime.from("2024-12-31T20:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2025-01-01T01:00:00[Pacific/Auckland]");
    expect(differenceInISOWeekYears(later, earlier)).toBe(0);
  });

  it("returns 0 for that mixed-zone pair reversed", () => {
    const later = ZonedDateTime.from("2025-01-01T01:00:00[Pacific/Auckland]");
    const earlier = ZonedDateTime.from("2024-12-31T20:00:00[America/New_York]");
    expect(differenceInISOWeekYears(later, earlier)).toBe(0);
  });
});
