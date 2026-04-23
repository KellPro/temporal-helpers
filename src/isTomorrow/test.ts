import { describe, it, expect } from "vitest";
import { isTomorrow } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isTomorrow", () => {
  it("returns true for next day", () => {
    const date = ZonedDateTime.from("2024-01-16T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isTomorrow(date, reference)).toBe(true);
  });

  it("returns false for same day", () => {
    const date = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isTomorrow(date, reference)).toBe(false);
  });
});
