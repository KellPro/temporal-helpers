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

  it("rolls 59:30 forward to the next hour", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T10:59:30[Europe/Paris]");
    expect(roundToNearestMinutes(date).toString()).toBe(
      "2024-07-10T11:00:00+02:00[Europe/Paris]",
    );
  });

  it("rolls a fraction past 59 minutes up to the next hour", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T10:59:01[Europe/Paris]");
    expect(roundToNearestMinutes(date, { roundingMethod: "ceil" }).toString()).toBe(
      "2024-07-10T11:00:00+02:00[Europe/Paris]",
    );
  });

  it("strips sub-second residue", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T12:34:56.789123456[Europe/Paris]");
    const result = roundToNearestMinutes(date);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });

  it("rolls 1:59 past the fall-back to 2:00 standard time", () => {
    // date-fns setMinutes(60) rolls the local clock. On the US fall-back
    // Sunday that is 2:00 EST, not the repeated 1:00.
    const firstOccurrence = Temporal.ZonedDateTime.from(
      "2024-11-03T01:59:30-04:00[America/New_York]",
    );
    const secondOccurrence = Temporal.ZonedDateTime.from(
      "2024-11-03T01:59:30-05:00[America/New_York]",
    );
    const ambiguous = Temporal.ZonedDateTime.from(
      "2024-11-03T01:59:30[America/New_York]",
    );
    expect(roundToNearestMinutes(firstOccurrence).toString()).toBe(
      "2024-11-03T02:00:00-05:00[America/New_York]",
    );
    expect(roundToNearestMinutes(secondOccurrence).toString()).toBe(
      "2024-11-03T02:00:00-05:00[America/New_York]",
    );
    expect(roundToNearestMinutes(ambiguous).toString()).toBe(
      "2024-11-03T02:00:00-05:00[America/New_York]",
    );
    expect(
      roundToNearestMinutes(firstOccurrence, { roundingMethod: "ceil" }).toString(),
    ).toBe("2024-11-03T02:00:00-05:00[America/New_York]");
  });

  it("keeps the daylight offset when flooring the first fall-back hour", () => {
    const firstOccurrence = Temporal.ZonedDateTime.from(
      "2024-11-03T01:59:30-04:00[America/New_York]",
    );
    expect(
      roundToNearestMinutes(firstOccurrence, { roundingMethod: "floor" }).toString(),
    ).toBe("2024-11-03T01:59:00-04:00[America/New_York]");
  });

  it("rolls 1:59 across the spring-forward gap to 3:00", () => {
    const date = Temporal.ZonedDateTime.from(
      "2024-03-10T01:59:30-05:00[America/New_York]",
    );
    expect(roundToNearestMinutes(date).toString()).toBe(
      "2024-03-10T03:00:00-04:00[America/New_York]",
    );
  });
});
