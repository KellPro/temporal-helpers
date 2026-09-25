import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { roundToNearestHours } from "../index.js";

describe("roundToNearestHours", () => {
  it("rounds to nearest hour (round)", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = roundToNearestHours(date);
    expect(result.hour).toBe(15);
  });

  it("rounds down with floor", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:29:00[America/New_York]");
    const result = roundToNearestHours(date, { roundingMethod: "floor" });
    expect(result.hour).toBe(14);
  });

  it("rounds up with ceil", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:01:00[America/New_York]");
    const result = roundToNearestHours(date, { roundingMethod: "ceil" });
    expect(result.hour).toBe(15);
  });

  it("zeroes sub-second residue from rounded result", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00.123456789[Europe/Paris]");
    const result = roundToNearestHours(date);
    expect(result.hour).toBe(15);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
