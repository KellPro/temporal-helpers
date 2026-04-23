import { describe, it, expect } from "vitest";
import { setMilliseconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("setMilliseconds", () => {
  it("should set milliseconds on a ZonedDateTime", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-15T10:30:45.123[America/New_York]");
    const result = setMilliseconds(date, 500);
    expect(result.millisecond).toBe(500);
    expect(result.second).toBe(45);
    expect(result.minute).toBe(30);
    expect(result.hour).toBe(10);
  });

  it("should preserve other fields when setting milliseconds", () => {
    const date = Temporal.ZonedDateTime.from("2024-06-20T08:15:30.999[Europe/London]");
    const result = setMilliseconds(date, 0);
    expect(result.millisecond).toBe(0);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(6);
    expect(result.day).toBe(20);
  });
});
