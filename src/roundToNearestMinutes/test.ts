import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { roundToNearestMinutes } from "../index.js";

describe("roundToNearestMinutes", () => {
  it("rounds to nearest minute (round)", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:00:30[America/New_York]");
    const result = roundToNearestMinutes(date);
    expect(result.minute).toBe(1);
  });

  it("rounds down with floor", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:00:29[America/New_York]");
    const result = roundToNearestMinutes(date, { roundingMethod: "floor" });
    expect(result.minute).toBe(0);
  });

  it("rounds up with ceil", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:00:01[America/New_York]");
    const result = roundToNearestMinutes(date, { roundingMethod: "ceil" });
    expect(result.minute).toBe(1);
  });

  it("zeroes sub-second residue from rounded result", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:00:30.123456789[Europe/Paris]");
    const result = roundToNearestMinutes(date);
    expect(result.minute).toBe(1);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
