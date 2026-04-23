import { describe, it, expect } from "vitest";
import { setWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("setWeek", () => {
  it("should set week on a ZonedDateTime", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-15T10:30:00[America/New_York]");
    const result = setWeek(date, 25);
    expect(result.weekOfYear).toBe(25);
  });

  it("should handle weekStartsOn option", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-10T10:30:00[America/New_York]");
    const result = setWeek(date, 2, { weekStartsOn: 1 });
    expect(result.weekOfYear).toBe(2);
  });
});
