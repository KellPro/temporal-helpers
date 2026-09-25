import { describe, it, expect } from "vitest";
import { differenceInElapsedDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInElapsedDays", () => {
  it("returns 0 for a 23-elapsed-hour span across the DST-short day", () => {
    const later = ZonedDateTime.from("2026-03-09T00:30:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-08T00:30:00[America/New_York]");
    expect(differenceInElapsedDays(later, earlier)).toBe(0);
  });

  it("returns 1 for a 25-elapsed-hour span across the fall-back day", () => {
    const later = ZonedDateTime.from("2026-11-02T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-11-01T11:00:00[America/New_York]");
    expect(differenceInElapsedDays(later, earlier)).toBe(1);
  });

  it("returns 2 for a 49-elapsed-hour span across the fall-back day", () => {
    const later = ZonedDateTime.from("2026-11-03T00:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-11-01T00:00:00[America/New_York]");
    expect(differenceInElapsedDays(later, earlier)).toBe(2);
  });

  it("returns 1 for a normal 24-hour span", () => {
    const later = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(differenceInElapsedDays(later, earlier)).toBe(1);
  });

  it("truncates towards zero for partial elapsed days", () => {
    const later = ZonedDateTime.from("2024-07-10T18:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T06:00:00[Europe/Paris]");
    expect(differenceInElapsedDays(later, earlier)).toBe(0);
  });

  it("returns 0, not -0, for a negative partial day", () => {
    const later = ZonedDateTime.from("2024-07-10T06:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T18:00:00[Europe/Paris]");
    const result = differenceInElapsedDays(later, earlier);
    expect(result).toBe(0);
    expect(Object.is(result, -0)).toBe(false);
  });

  it("returns 0 for a span 900 microseconds short of 24 hours", () => {
    const earlier = ZonedDateTime.from("2024-07-10T12:00:00.000900000[Europe/Paris]");
    const later = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");
    expect(differenceInElapsedDays(later, earlier)).toBe(0);
  });

  it("returns 0 for the same instant", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(differenceInElapsedDays(date, date)).toBe(0);
  });

  it("returns a negative number when reversed", () => {
    const later = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");
    expect(differenceInElapsedDays(later, earlier)).toBe(-2);
  });

  it("is zone-independent: mixed zones count pure elapsed time", () => {
    const later = ZonedDateTime.from("2026-03-08T12:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2026-03-07T12:00:00[Europe/Paris]");
    // 29 elapsed hours regardless of the zones involved
    expect(differenceInElapsedDays(later, earlier)).toBe(1);
    expect(differenceInElapsedDays(later, earlier)).toBe(
      differenceInElapsedDays(later.withTimeZone("UTC"), earlier.withTimeZone("UTC")),
    );
  });
});
