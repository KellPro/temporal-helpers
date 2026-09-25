import { describe, it, expect } from "vitest";
import { differenceInWeeks } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInWeeks", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns weeks between dates", () => {
    expect(differenceInWeeks(date3, date1)).toBe(0);
  });

  it("returns full weeks between dates", () => {
    const later = ZonedDateTime.from("2014-07-08T18:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2014-06-29T06:00:00[Europe/Paris]");
    expect(differenceInWeeks(later, earlier)).toBe(1);
  });

  it("truncates fractional weeks towards zero by default", () => {
    const later = ZonedDateTime.from("2014-06-29T06:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2014-07-13T05:00:00[Europe/Paris]");
    expect(differenceInWeeks(later, earlier)).toBe(-1);
  });

  it("supports roundingMethod ceil/floor/round", () => {
    const later = ZonedDateTime.from("2024-07-13T05:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-06-29T06:00:00[Europe/Paris]");
    expect(differenceInWeeks(later, earlier)).toBe(1);
    expect(differenceInWeeks(later, earlier, { roundingMethod: "trunc" })).toBe(1);
    expect(differenceInWeeks(later, earlier, { roundingMethod: "ceil" })).toBe(2);
    expect(differenceInWeeks(later, earlier, { roundingMethod: "floor" })).toBe(1);
    expect(differenceInWeeks(later, earlier, { roundingMethod: "round" })).toBe(2);
  });

  it("inherits calendar semantics from differenceInDays across DST", () => {
    // 28 wall-clock days spanning the 2026 spring-forward: 4 full weeks even
    // though only 671 elapsed hours
    const later = ZonedDateTime.from("2026-03-29T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-01T12:00:00[America/New_York]");
    expect(differenceInWeeks(later, earlier)).toBe(4);
  });

  it("returns 0 for the same instant", () => {
    expect(differenceInWeeks(date1, date1)).toBe(0);
  });

  it("returns 0, not -0, for a reversed span shorter than a week (date-fns #2555)", () => {
    // 1 full day apart, reversed: days = -1, so -1/7 truncates to -0
    const later = ZonedDateTime.from("2024-07-13T06:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-15T05:00:00[Europe/Paris]");
    const result = differenceInWeeks(later, earlier);
    expect(result).toBe(0);
    expect(Object.is(result, 0)).toBe(true);
  });
});
