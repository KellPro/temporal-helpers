import { describe, it, expect } from "vitest";
import { differenceInMonths } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInMonths", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns months between dates", () => {
    const dec = ZonedDateTime.from("2024-12-10T12:00:00[Europe/Paris]");
    expect(differenceInMonths(dec, date1)).toBe(5);
  });

  it("returns the number of full months between the given dates", () => {
    const later = ZonedDateTime.from("2012-07-02T18:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2011-07-02T06:00:00[Europe/Paris]");
    expect(differenceInMonths(later, earlier)).toBe(12);
  });

  it("returns a negative number if the time value of the first date is smaller", () => {
    const later = ZonedDateTime.from("2011-07-02T06:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2012-07-02T18:00:00[Europe/Paris]");
    expect(differenceInMonths(later, earlier)).toBe(-12);
  });

  it("accounts for time of day", () => {
    const later = ZonedDateTime.from("2012-07-02T06:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2011-07-02T18:00:00[Europe/Paris]");
    expect(differenceInMonths(later, earlier)).toBe(11);
  });

  it("returns 0 when the difference is less than a month but the dates are in different months", () => {
    const later = ZonedDateTime.from("2014-08-01T00:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2014-07-31T00:00:00[Europe/Paris]");
    expect(differenceInMonths(later, earlier)).toBe(0);
  });

  it("returns 0 for the same dates swapped across a month boundary", () => {
    const later = ZonedDateTime.from("2014-07-31T00:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2014-08-01T00:00:00[Europe/Paris]");
    expect(differenceInMonths(later, earlier)).toBe(0);
  });

  it("returns 0, not -0, for the same instant", () => {
    const result = differenceInMonths(date1, date1);
    expect(result).toBe(0);
    expect(Object.is(result, -0)).toBe(false);
  });

  describe("clamped month-end anniversaries (divergence from date-fns)", () => {
    it("the anniversary keeps the earlier date's time of day", () => {
      // Jan 28 22:00 + 1 month = Feb 28 22:00, which is past the later date
      // (Feb 28 00:00): not a full month. date-fns's February pivot ignores
      // the time of day and reports 1.
      const later = ZonedDateTime.from("2019-02-28T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2019-01-28T22:00:00[Europe/Paris]");
      const result = differenceInMonths(later, earlier);
      expect(result).toBe(0);
      expect(Object.is(result, -0)).toBe(false);
    });

    it("a clamped anniversary reaching the later date exactly is a full month", () => {
      // Jan 30 2024 + 1 month clamps to Feb 29 = the later date
      const later = ZonedDateTime.from("2024-02-29T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2024-01-30T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });
  });

  describe("edge cases (adapted from date-fns)", () => {
    it("returns 1 month between Feb 28 2021 and Jan 30 2021", () => {
      const later = ZonedDateTime.from("2021-02-28T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2021-01-30T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });

    it("returns 1 month between Feb 28 2021 and Jan 31 2021", () => {
      const later = ZonedDateTime.from("2021-02-28T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2021-01-31T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });

    it("returns 1 month between Feb 29 2024 and Jan 30 2024", () => {
      const later = ZonedDateTime.from("2024-02-29T00:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2024-01-30T00:00:00[America/New_York]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });

    it("returns 1 month between Nov 30 2021 and Oct 31 2021", () => {
      const later = ZonedDateTime.from("2021-11-30T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2021-10-31T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });

    it("returns 1 month between Oct 31 2021 and Sep 30 2021", () => {
      const later = ZonedDateTime.from("2021-10-31T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2021-09-30T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });

    it("returns 6 months between Oct 31 2021 and Apr 30 2021", () => {
      const later = ZonedDateTime.from("2021-10-31T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2021-04-30T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(6);
    });

    it("returns -1 month between Sep 30 2021 and Oct 31 2021", () => {
      const later = ZonedDateTime.from("2021-09-30T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2021-10-31T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(-1);
    });

    it("returns 1 month between Mar 31 2024 and Feb 29 2024", () => {
      const later = ZonedDateTime.from("2024-03-31T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2024-02-29T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });

    it("the days of months of the given dates are the same", () => {
      const later = ZonedDateTime.from("2014-09-06T00:00:00[Europe/Paris]");
      const earlier = ZonedDateTime.from("2014-08-06T00:00:00[Europe/Paris]");
      expect(differenceInMonths(later, earlier)).toBe(1);
    });
  });

  describe("mixed zones", () => {
    it("returns 0 when civil months differ but the instants are hours apart", () => {
      // July 1 Auckland is 14 hours before June 30 New York. Not a full month.
      const later = ZonedDateTime.from("2024-07-01T01:00:00[Pacific/Auckland]");
      const earlier = ZonedDateTime.from("2024-06-30T23:00:00[America/New_York]");
      expect(differenceInMonths(later, earlier)).toBe(0);
      expect(Object.is(differenceInMonths(later, earlier), -0)).toBe(false);
    });

    it("returns 0 for that pair reversed", () => {
      // June 30 New York is the later instant, and the last day of its month.
      // The span is still about 14 hours, so it is not a full month.
      const later = ZonedDateTime.from("2024-06-30T23:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2024-07-01T01:00:00[Pacific/Auckland]");
      expect(differenceInMonths(later, earlier)).toBe(0);
    });

    it("counts 11 months when 10:00 has not reached 18:00", () => {
      const later = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
      const earlier = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
      expect(differenceInMonths(later, earlier)).toBe(11);
    });

    it("returns -11 for that anniversary reversed", () => {
      const later = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
      const earlier = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
      expect(differenceInMonths(later, earlier)).toBe(-11);
    });
  });
});
