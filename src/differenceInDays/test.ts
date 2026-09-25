import { describe, it, expect } from "vitest";
import { differenceInDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInDays", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns days between dates", () => {
    expect(differenceInDays(date3, date1)).toBe(2);
  });

  it("returns negative days when reversed", () => {
    expect(differenceInDays(date1, date3)).toBe(-2);
  });

  it("counts a full calendar day across a DST-short day (23 elapsed hours)", () => {
    const later = ZonedDateTime.from("2026-03-09T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-08T12:00:00[America/New_York]");
    expect(differenceInDays(later, earlier)).toBe(1);
  });

  it("counts a full calendar day across a DST-long fall-back day (25 elapsed hours)", () => {
    const later = ZonedDateTime.from("2026-11-02T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-11-01T12:00:00[America/New_York]");
    expect(differenceInDays(later, earlier)).toBe(1);
  });

  it("returns 0 for 23 hours when it is not a full day (non-DST)", () => {
    const later = ZonedDateTime.from("2024-01-02T09:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-01-01T10:00:00[Europe/Paris]");
    expect(differenceInDays(later, earlier)).toBe(0);
  });

  it("returns 0 for the same instant", () => {
    expect(differenceInDays(date1, date1)).toBe(0);
  });

  it("returns 0, not -0, for the same instant", () => {
    const result = differenceInDays(date1, date1);
    expect(Object.is(result, -0)).toBe(false);
  });

  describe("edge cases (adapted from date-fns)", () => {
    it("the difference is less than a day, but the given dates are in different calendar days", () => {
      const later = ZonedDateTime.from("2014-09-05T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2014-09-04T23:59:00[Europe/Paris]");
      expect(differenceInDays(later, earlier)).toBe(0);
    });

    it("the same for the swapped dates", () => {
      const later = ZonedDateTime.from("2014-09-04T23:59:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2014-09-05T00:00:00[Europe/Paris]");
      expect(differenceInDays(later, earlier)).toBe(0);
    });

    it("the time values of the given dates are the same", () => {
      const later = ZonedDateTime.from("2014-09-06T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2014-09-05T00:00:00[Europe/Paris]");
      expect(differenceInDays(later, earlier)).toBe(1);
    });
  });

  describe("mixed zones", () => {
    it("anchors each input in its own zone (wall-clock date fields)", () => {
      const later = ZonedDateTime.from("2026-03-09T12:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2026-03-01T12:00:00[Europe/Paris]");
      // 8 calendar days apart on the wall clock, regardless of the zones
      expect(differenceInDays(later, earlier)).toBe(8);
    });

    it("drops the last day when the later clock time is before the earlier clock time", () => {
      // Civil dates are 365 days apart. 10:00 has not reached 18:00, so the
      // last day is not full. Aligning into New York would count 365, because
      // 18:00 in Tokyo is 04:00 in New York.
      const later = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
      expect(differenceInDays(later, earlier)).toBe(364);
    });

    it("returns the negative of that clock comparison when reversed", () => {
      const later = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
      const earlier = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
      expect(differenceInDays(later, earlier)).toBe(-364);
    });

    it("returns 0 for a span of hours whose civil dates differ by one day", () => {
      const later = ZonedDateTime.from("2024-07-01T01:00:00[Pacific/Auckland]");
      const earlier = ZonedDateTime.from("2024-06-30T23:00:00[America/New_York]");
      expect(differenceInDays(later, earlier)).toBe(0);
    });
  });
});
