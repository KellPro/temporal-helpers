import { describe, it, expect } from "vitest";
import { startOfToday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("startOfToday", () => {
  it("should return start of today", () => {
    const result = startOfToday();
    const now = Temporal.Now.zonedDateTimeISO();
    expect(result.year).toBe(now.year);
    expect(result.month).toBe(now.month);
    expect(result.day).toBe(now.day);
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
