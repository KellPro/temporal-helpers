import { describe, it, expect } from "vitest";
import { isThisISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThisISOWeek", () => {
  it("returns true for same ISO week as reference", () => {
    const date = ZonedDateTime.from("2024-01-08T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]");
    expect(isThisISOWeek(date, reference)).toBe(true);
  });

  it("returns false for different ISO week", () => {
    const date = ZonedDateTime.from("2024-01-20T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]");
    expect(isThisISOWeek(date, reference)).toBe(false);
  });
});
