import { describe, it, expect } from "vitest";
import { nextWednesday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("nextWednesday", () => {
  it("returns next Wednesday", () => {
    const date = ZonedDateTime.from("2024-01-12T12:00:00[Europe/Paris]"); // Friday
    const result = nextWednesday(date);
    expect(result.dayOfWeek).toBe(3);
    expect(result.day).toBe(17);
  });

  it("returns same Wednesday if already Wednesday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday
    const result = nextWednesday(date);
    expect(result.dayOfWeek).toBe(3);
  });
});
