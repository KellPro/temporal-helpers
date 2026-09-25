import { describe, it, expect } from "vitest";
import { differenceInCalendarDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInCalendarDays", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns calendar days between dates", () => {
    expect(differenceInCalendarDays(date3, date1)).toBe(2);
  });

  it("returns negative calendar days when reversed", () => {
    expect(differenceInCalendarDays(date1, date3)).toBe(-2);
  });

  it("ignores time of day", () => {
    const later = ZonedDateTime.from("2024-07-12T00:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T23:59:00[Europe/Paris]");
    expect(differenceInCalendarDays(later, earlier)).toBe(2);
  });

  it("counts 1 across the DST-short day (23 elapsed hours)", () => {
    const later = ZonedDateTime.from("2026-03-09T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-08T12:00:00[America/New_York]");
    expect(differenceInCalendarDays(later, earlier)).toBe(1);
  });

  it("counts 1 across the DST-long fall-back day (25 elapsed hours)", () => {
    const later = ZonedDateTime.from("2026-11-02T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-11-01T12:00:00[America/New_York]");
    expect(differenceInCalendarDays(later, earlier)).toBe(1);
  });

  it("returns 0 for the same instant", () => {
    expect(differenceInCalendarDays(date1, date1)).toBe(0);
  });

  it("anchors each input in its own zone for mixed-zone pairs", () => {
    const later = ZonedDateTime.from("2026-03-10T00:30:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-08T23:30:00[Europe/Paris]");
    // Wall-clock dates are Mar 10 and Mar 8 -> 2 calendar days (the instants
    // are only ~31 elapsed hours apart)
    expect(differenceInCalendarDays(later, earlier)).toBe(2);
  });

  it("counts civil dates across zones, including a leap-year span of matching month-days", () => {
    // 2024-03-01 to 2025-03-01 is 365 civil days (the leap day is before March).
    const later = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
    expect(differenceInCalendarDays(later, earlier)).toBe(365);
  });
});
