import { describe, it, expect } from "vitest";
import { differenceInCalendarWeeks } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInCalendarWeeks", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns calendar weeks between dates", () => {
    expect(differenceInCalendarWeeks(date3, date1)).toBe(0);
  });

  it("returns calendar weeks between dates in different weeks", () => {
    const later = ZonedDateTime.from("2024-07-20T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(differenceInCalendarWeeks(later, earlier)).toBe(1);
  });

  it("honors weekStartsOn", () => {
    const later = ZonedDateTime.from("2024-07-15T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-14T12:00:00[Europe/Paris]");
    // Sunday-start: both belong to the week starting Jul 14
    expect(differenceInCalendarWeeks(later, earlier)).toBe(0);
    // Monday-start: Jul 14 starts its own week
    expect(differenceInCalendarWeeks(later, earlier, { weekStartsOn: 1 })).toBe(1);
  });

  it("counts 4 weeks across the 2026 spring-forward week span", () => {
    const later = ZonedDateTime.from("2026-03-29T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-01T12:00:00[America/New_York]");
    expect(differenceInCalendarWeeks(later, earlier)).toBe(4);
  });
});
