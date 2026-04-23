import { describe, it, expect } from "vitest";
import { setSeconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("setSeconds", () => {
  it("should set seconds on a ZonedDateTime", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-15T10:30:45[America/New_York]");
    const result = setSeconds(date, 15);
    expect(result.second).toBe(15);
    expect(result.minute).toBe(30);
    expect(result.hour).toBe(10);
  });

  it("should preserve other fields when setting seconds", () => {
    const date = Temporal.ZonedDateTime.from("2024-06-20T08:15:30[Europe/London]");
    const result = setSeconds(date, 0);
    expect(result.second).toBe(0);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(6);
    expect(result.day).toBe(20);
  });
});
