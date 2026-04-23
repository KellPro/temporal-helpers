import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { previousSaturday } from "../index.js";

describe("previousSaturday", () => {
  it("returns the previous Saturday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = previousSaturday(date);
    expect(result.dayOfWeek).toBe(6);
    expect(result.day).toBe(6);
  });

  it("returns the same day if already Saturday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-06T12:00:00[America/New_York]");
    const result = previousSaturday(date);
    expect(result.day).toBe(6);
  });
});
