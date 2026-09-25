import { describe, it, expect } from "vitest";
import { differenceInYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInYears", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns years between dates", () => {
    const nextYear = ZonedDateTime.from("2025-07-10T12:00:00[Europe/Paris]");
    expect(differenceInYears(nextYear, date1)).toBe(1);
  });

  it("returns negative years when reversed", () => {
    const nextYear = ZonedDateTime.from("2025-07-10T12:00:00[Europe/Paris]");
    expect(differenceInYears(date1, nextYear)).toBe(-1);
  });

  describe("leap days (adapted from date-fns)", () => {
    it("supports past dates with right side after leap day", () => {
      const later = ZonedDateTime.from("2004-02-29T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2002-03-01T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(1);
    });

    it("supports past dates with right side before leap day", () => {
      const later = ZonedDateTime.from("2004-02-29T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2002-02-28T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(2);
    });

    it("supports future dates", () => {
      const later = ZonedDateTime.from("2004-02-29T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2006-03-01T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(-2);
    });

    it("supports equal dates of same year", () => {
      const later = ZonedDateTime.from("2004-02-29T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2004-02-29T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(0);
    });

    it("supports equal dates of different years", () => {
      const later = ZonedDateTime.from("2008-02-29T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2004-02-29T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(4);
    });
  });

  describe("edge cases (adapted from date-fns)", () => {
    it("the difference is less than a year, but the given dates are in different calendar years", () => {
      const later = ZonedDateTime.from("2015-01-01T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2014-12-31T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(0);
    });

    it("the same for the swapped dates", () => {
      const later = ZonedDateTime.from("2014-12-31T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2015-01-01T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(0);
    });

    it("the days and months of the given dates are the same", () => {
      const later = ZonedDateTime.from("2014-09-05T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2012-09-05T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(2);
    });

    it("accounts for time of day", () => {
      const later = ZonedDateTime.from("2024-01-02T09:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2023-01-02T10:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(0);
    });
  });

  describe("clamped leap-day anniversaries (divergence from date-fns)", () => {
    it("counts Feb 29 -> Feb 28 of the next year as one full year", () => {
      // Our addYears clamps: Feb 29 2024 + 1 year = Feb 28 2025 = the later
      // date, so the anniversary is reached. date-fns's addYears overflows to
      // Mar 1 and its 1584 normalization reports 0 here.
      const later = ZonedDateTime.from("2025-02-28T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2024-02-29T00:00:00[Europe/Paris]");
      const result = differenceInYears(later, earlier);
      expect(result).toBe(1);
      expect(Object.is(result, -0)).toBe(false);
    });

    it("counts Feb 29 2024 -> Feb 28 2027 as three full years", () => {
      const later = ZonedDateTime.from("2027-02-28T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2024-02-29T00:00:00[Europe/Paris]");
      expect(differenceInYears(later, earlier)).toBe(3);
    });
  });

  describe("mixed zones", () => {
    it("returns 0 when civil years match but the offset reverses instant order", () => {
      // July 1 01:00 Auckland is 14 hours before June 30 23:00 New York.
      // Both civil years are 2024. Instant order alone used to report 1 year.
      const later = ZonedDateTime.from("2024-07-01T01:00:00[Pacific/Auckland]");
      const earlier = ZonedDateTime.from("2024-06-30T23:00:00[America/New_York]");
      expect(differenceInYears(later, earlier)).toBe(0);
      expect(Object.is(differenceInYears(later, earlier), -0)).toBe(false);
    });

    it("returns 0 for that pair reversed", () => {
      const later = ZonedDateTime.from("2024-06-30T23:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2024-07-01T01:00:00[Pacific/Auckland]");
      expect(differenceInYears(later, earlier)).toBe(0);
    });

    it("returns 0 across a civil year boundary when the instants are hours apart", () => {
      // Jan 1 01:00 Auckland is 13 hours before Dec 31 20:00 New York.
      // Instant order alone used to report -1 year.
      const later = ZonedDateTime.from("2025-01-01T01:00:00[Pacific/Auckland]");
      const earlier = ZonedDateTime.from("2024-12-31T20:00:00[America/New_York]");
      expect(differenceInYears(later, earlier)).toBe(0);
      expect(Object.is(differenceInYears(later, earlier), -0)).toBe(false);
    });

    it("returns 0 for that year-boundary pair reversed", () => {
      const later = ZonedDateTime.from("2024-12-31T20:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2025-01-01T01:00:00[Pacific/Auckland]");
      expect(differenceInYears(later, earlier)).toBe(0);
    });

    it("uses each zone's clock, so 10:00 has not reached 18:00", () => {
      // Aligning both into New York and calling until() would count 1 year,
      // because 18:00 in Tokyo is 04:00 in New York. Own-zone clocks do not.
      const later = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
      expect(differenceInYears(later, earlier)).toBe(0);
    });
  });
});
