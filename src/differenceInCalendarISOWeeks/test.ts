import { describe, it, expect } from "vitest";
import { differenceInCalendarISOWeeks } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInCalendarISOWeeks", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns calendar ISO weeks between dates", () => {
    expect(differenceInCalendarISOWeeks(date3, date1)).toBe(0);
  });

  it("returns calendar ISO weeks between dates in different ISO weeks", () => {
    const later = ZonedDateTime.from("2024-07-15T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(differenceInCalendarISOWeeks(later, earlier)).toBe(1);
  });

  it("counts 4 ISO weeks across the 2026 spring-forward week span", () => {
    const later = ZonedDateTime.from("2026-03-30T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-02T12:00:00[America/New_York]");
    expect(differenceInCalendarISOWeeks(later, earlier)).toBe(4);
  });
});
