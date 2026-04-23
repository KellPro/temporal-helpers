import { describe, it, expect } from "vitest";
import { isThisMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThisMonth", () => {
  it("returns true for same month as reference", () => {
    const date = ZonedDateTime.from("2024-01-20T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isThisMonth(date, reference)).toBe(true);
  });

  it("returns false for different month", () => {
    const date = ZonedDateTime.from("2024-02-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isThisMonth(date, reference)).toBe(false);
  });
});
