import { describe, it, expect } from "vitest";
import { isThisSecond } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThisSecond", () => {
  it("returns true for same second as reference", () => {
    const date = ZonedDateTime.from("2024-01-15T12:30:45[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:30:45[Europe/Paris]");
    expect(isThisSecond(date, reference)).toBe(true);
  });

  it("returns false for different second", () => {
    const date = ZonedDateTime.from("2024-01-15T12:30:46[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:30:45[Europe/Paris]");
    expect(isThisSecond(date, reference)).toBe(false);
  });
});
