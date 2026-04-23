import { describe, it, expect } from "vitest";
import { isLastDayOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isLastDayOfMonth", () => {
  const last = ZonedDateTime.from("2024-07-31T12:00:00[Europe/Paris]");
  const other = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns true for last day", () => {
    expect(isLastDayOfMonth(last)).toBe(true);
  });

  it("returns false for other days", () => {
    expect(isLastDayOfMonth(other)).toBe(false);
  });
});
