import { describe, it, expect } from "vitest";
import { addBusinessDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addBusinessDays", () => {
  it("adds one business day from Friday to Monday", () => {
    const friday = ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]");
    const result = addBusinessDays(friday, 1);
    expect(result.day).toBe(8);
    expect(result.dayOfWeek).toBe(1);
  });

  it("crosses Saturday and Sunday when adding from Thursday", () => {
    const thursday = ZonedDateTime.from("2026-09-24T12:00:00[Europe/Paris]");
    const result = addBusinessDays(thursday, 2);
    expect(result.day).toBe(28);
    expect(result.dayOfWeek).toBe(1);
  });

  it("skips the whole weekend in a non-UTC zone", () => {
    const thursday = ZonedDateTime.from("2026-09-24T12:00:00[America/New_York]");
    const result = addBusinessDays(thursday, 2);
    expect(result.day).toBe(28);
    expect(result.dayOfWeek).toBe(1);
    expect(result.timeZoneId).toBe("America/New_York");
  });

  it("starts on a weekend and lands on Monday", () => {
    const saturday = ZonedDateTime.from("2026-09-26T12:00:00[America/New_York]");
    const result = addBusinessDays(saturday, 1);
    expect(result.day).toBe(28);
    expect(result.dayOfWeek).toBe(1);
  });

  it("subtracts business days across the weekend", () => {
    const monday = ZonedDateTime.from("2026-09-28T12:00:00[Europe/Paris]");
    const result = addBusinessDays(monday, -2);
    expect(result.day).toBe(24);
    expect(result.dayOfWeek).toBe(4);
  });

  it("returns the input unchanged for amount 0", () => {
    const thursday = ZonedDateTime.from("2026-09-24T12:00:00[America/New_York]");
    const result = addBusinessDays(thursday, 0);
    expect(result).toBe(thursday);
  });
});
