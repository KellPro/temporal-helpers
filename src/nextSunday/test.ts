import { describe, it, expect } from "vitest";
import { nextSunday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("nextSunday", () => {
  it("returns next Sunday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday
    const result = nextSunday(date);
    expect(result.dayOfWeek).toBe(7);
    expect(result.day).toBe(14);
  });

  it("returns same Sunday if already Sunday", () => {
    const date = ZonedDateTime.from("2024-01-14T12:00:00[Europe/Paris]"); // Sunday
    const result = nextSunday(date);
    expect(result.dayOfWeek).toBe(7);
  });
});
