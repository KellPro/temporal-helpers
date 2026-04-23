import { describe, it, expect } from "vitest";
import { isThisWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThisWeek", () => {
  it("returns true for same week as reference", () => {
    const date = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isThisWeek(date, {}, reference)).toBe(true);
  });

  it("returns false for different week", () => {
    const date = ZonedDateTime.from("2024-01-22T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-14T12:00:00[Europe/Paris]");
    expect(isThisWeek(date, reference)).toBe(false);
  });
});
