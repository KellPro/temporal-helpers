import { describe, it, expect } from "vitest";
import { startOfYesterday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("startOfYesterday", () => {
  it("should return start of yesterday", () => {
    const result = startOfYesterday();
    const now = Temporal.Now.zonedDateTimeISO();
    const yesterday = now.subtract({ days: 1 });
    expect(result.year).toBe(yesterday.year);
    expect(result.month).toBe(yesterday.month);
    expect(result.day).toBe(yesterday.day);
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
