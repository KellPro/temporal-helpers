import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { previousWednesday } from "../index.js";

describe("previousWednesday", () => {
  it("goes back 7 days when already Wednesday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = previousWednesday(date);
    expect(result.dayOfWeek).toBe(3);
    expect(result.day).toBe(3);
  });

  it("returns the previous Wednesday when not Wednesday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-12T12:00:00[America/New_York]");
    const result = previousWednesday(date);
    expect(result.dayOfWeek).toBe(3);
    expect(result.day).toBe(10);
  });
});
