import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { previousTuesday } from "../index.js";

describe("previousTuesday", () => {
  it("returns the previous Tuesday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = previousTuesday(date);
    expect(result.dayOfWeek).toBe(2);
    expect(result.day).toBe(9);
  });

  it("goes back 7 days when already Tuesday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-09T12:00:00[America/New_York]");
    const result = previousTuesday(date);
    expect(result.dayOfWeek).toBe(2);
    expect(result.day).toBe(2);
  });
});
