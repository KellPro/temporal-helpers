import { describe, it, expect } from "vitest";
import { subBusinessDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subBusinessDays", () => {
  it("subtracts one business day from Monday to Friday", () => {
    const monday = ZonedDateTime.from("2024-07-08T12:00:00[Europe/Paris]");
    const result = subBusinessDays(monday, 1);
    expect(result.day).toBe(5);
  });

  it("crosses Saturday and Sunday when subtracting from Monday", () => {
    const monday = ZonedDateTime.from("2026-09-28T12:00:00[America/New_York]");
    const result = subBusinessDays(monday, 2);
    expect(result.day).toBe(24);
    expect(result.dayOfWeek).toBe(4);
  });

  it("returns the input unchanged for amount 0", () => {
    const monday = ZonedDateTime.from("2026-09-28T12:00:00[Europe/Paris]");
    const result = subBusinessDays(monday, 0);
    expect(result).toBe(monday);
  });
});
