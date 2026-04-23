import { describe, it, expect } from "vitest";
import { startOfTomorrow } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("startOfTomorrow", () => {
  it("should return start of tomorrow", () => {
    const result = startOfTomorrow();
    const now = Temporal.Now.zonedDateTimeISO();
    const tomorrow = now.add({ days: 1 });
    expect(result.year).toBe(tomorrow.year);
    expect(result.month).toBe(tomorrow.month);
    expect(result.day).toBe(tomorrow.day);
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
