import { describe, it, expect } from "vitest";
import { lastDayOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfMonth", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns last day of month", () => {
    const result = lastDayOfMonth(date);
    expect(result.day).toBe(31);
    expect(result.millisecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.nanosecond).toBe(999);
  });
});
