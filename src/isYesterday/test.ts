import { describe, it, expect } from "vitest";
import { isYesterday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isYesterday", () => {
  it("returns true for previous day", () => {
    const date = ZonedDateTime.from("2024-01-14T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isYesterday(date, reference)).toBe(true);
  });

  it("returns false for same day", () => {
    const date = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isYesterday(date, reference)).toBe(false);
  });
});
