import { describe, it, expect } from "vitest";
import { differenceInCalendarQuarters } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInCalendarQuarters", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns calendar quarters between dates", () => {
    const oct = ZonedDateTime.from("2024-10-10T12:00:00[Europe/Paris]");
    expect(differenceInCalendarQuarters(oct, date1)).toBe(1);
  });

  it("counts a different calendar quarter within the same year", () => {
    const later = ZonedDateTime.from("2024-04-15T00:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-03-15T00:00:00[Europe/Paris]");
    // Apr is Q2, Mar is Q1 -> 1 calendar quarter apart
    expect(differenceInCalendarQuarters(later, earlier)).toBe(1);
  });

  it("spans years", () => {
    const later = ZonedDateTime.from("2026-01-10T00:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-10-10T00:00:00[Europe/Paris]");
    // 2026 Q1 vs 2024 Q4 -> 5 quarters
    expect(differenceInCalendarQuarters(later, earlier)).toBe(5);
  });

  it("returns 0 for the same instant", () => {
    expect(differenceInCalendarQuarters(date1, date1)).toBe(0);
  });
});
