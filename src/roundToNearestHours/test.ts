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

  it("rolls 23:30 forward to the next midnight", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T23:30:00[Europe/Paris]");
    expect(roundToNearestHours(date).toString()).toBe(
      "2024-07-11T00:00:00+02:00[Europe/Paris]",
    );
    expect(roundToNearestHours(date, { roundingMethod: "ceil" }).toString()).toBe(
      "2024-07-11T00:00:00+02:00[Europe/Paris]",
    );
  });

  it("keeps 23:30 when flooring", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T23:30:00[Europe/Paris]");
    expect(roundToNearestHours(date, { roundingMethod: "floor" }).toString()).toBe(
      "2024-07-10T23:00:00+02:00[Europe/Paris]",
    );
  });

  it("strips sub-second residue", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T12:34:56.789123456[Europe/Paris]");
    const result = roundToNearestHours(date);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
