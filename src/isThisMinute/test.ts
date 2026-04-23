import { describe, it, expect } from "vitest";
import { isThisMinute } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThisMinute", () => {
  it("returns true for same minute as reference", () => {
    const date = ZonedDateTime.from("2024-01-15T12:30:45[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:30:00[Europe/Paris]");
    expect(isThisMinute(date, reference)).toBe(true);
  });

  it("returns false for different minute", () => {
    const date = ZonedDateTime.from("2024-01-15T12:31:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:30:00[Europe/Paris]");
    expect(isThisMinute(date, reference)).toBe(false);
  });
});
