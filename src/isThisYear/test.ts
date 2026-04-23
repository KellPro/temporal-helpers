import { describe, it, expect } from "vitest";
import { isThisYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThisYear", () => {
  it("returns true for same year as reference", () => {
    const date = ZonedDateTime.from("2024-06-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isThisYear(date, reference)).toBe(true);
  });

  it("returns false for different year", () => {
    const date = ZonedDateTime.from("2025-01-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isThisYear(date, reference)).toBe(false);
  });
});
