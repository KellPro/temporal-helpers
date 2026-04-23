import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { previousSunday } from "../index.js";

describe("previousSunday", () => {
  it("returns the same Sunday when already Sunday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = previousSunday(date);
    expect(result.dayOfWeek).toBe(7);
    expect(result.day).toBe(7);
  });

  it("returns the same Sunday when on that day", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-07T12:00:00[America/New_York]");
    const result = previousSunday(date);
    expect(result.day).toBe(7);
  });
});
