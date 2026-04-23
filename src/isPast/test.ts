import { describe, it, expect } from "vitest";
import { isPast } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isPast", () => {
  it("returns true for past date", () => {
    const past = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(isPast(past)).toBe(true);
  });

  it("returns false for future date", () => {
    const future = ZonedDateTime.from("2030-01-01T12:00:00[Europe/Paris]");
    expect(isPast(future)).toBe(false);
  });
});
