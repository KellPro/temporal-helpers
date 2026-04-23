import { describe, it, expect } from "vitest";
import { isFuture } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isFuture", () => {
  it("returns false for past date", () => {
    const past = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(isFuture(past)).toBe(false);
  });

  it("returns true for future date", () => {
    const future = ZonedDateTime.from("2030-01-01T12:00:00[Europe/Paris]");
    expect(isFuture(future)).toBe(true);
  });
});
