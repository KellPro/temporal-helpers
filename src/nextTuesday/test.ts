import { describe, it, expect } from "vitest";
import { nextTuesday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("nextTuesday", () => {
  it("returns next Tuesday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday
    const result = nextTuesday(date);
    expect(result.dayOfWeek).toBe(2);
    expect(result.day).toBe(16);
  });

  it("returns same Tuesday if already Tuesday", () => {
    const date = ZonedDateTime.from("2024-01-09T12:00:00[Europe/Paris]"); // Tuesday
    const result = nextTuesday(date);
    expect(result.dayOfWeek).toBe(2);
  });
});
