import { describe, it, expect } from "vitest";
import { isSameYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameYear", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const sameYear = ZonedDateTime.from("2024-01-01T12:00:00[Europe/Paris]");
  const diffYear = ZonedDateTime.from("2025-07-10T12:00:00[Europe/Paris]");

  it("returns true for same year", () => {
    expect(isSameYear(date1, sameYear)).toBe(true);
  });

  it("returns false for different year", () => {
    expect(isSameYear(date1, diffYear)).toBe(false);
  });
});
