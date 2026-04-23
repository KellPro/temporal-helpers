import { describe, it, expect } from "vitest";
import { setQuarter, getQuarter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("setQuarter", () => {
  it("should set quarter on a ZonedDateTime", () => {
    const date = Temporal.ZonedDateTime.from("2024-02-15T10:30:00[America/New_York]");
    const result = setQuarter(date, 2);
    expect(getQuarter(result)).toBe(2);
  });

  it("should set quarter to 1", () => {
    const date = Temporal.ZonedDateTime.from("2024-05-10T08:00:00[Europe/London]");
    const result = setQuarter(date, 1);
    expect(getQuarter(result)).toBe(1);
    expect(result.month).toBeLessThanOrEqual(3);
  });

  it("should set quarter to 4", () => {
    const date = Temporal.ZonedDateTime.from("2024-01-01T00:00:00[America/Chicago]");
    const result = setQuarter(date, 4);
    expect(getQuarter(result)).toBe(4);
  });
});
