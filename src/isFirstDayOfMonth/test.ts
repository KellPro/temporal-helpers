import { describe, it, expect } from "vitest";
import { isFirstDayOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isFirstDayOfMonth", () => {
  const first = ZonedDateTime.from("2024-07-01T12:00:00[Europe/Paris]");
  const other = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns true for first day", () => {
    expect(isFirstDayOfMonth(first)).toBe(true);
  });

  it("returns false for other days", () => {
    expect(isFirstDayOfMonth(other)).toBe(false);
  });
});
