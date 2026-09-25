import { describe, it, expect } from "vitest";
import { startOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfMonth", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of month", () => {
    const result = startOfMonth(date);
    expect(result.month).toBe(7);
    expect(result.day).toBe(1);
  });

  it("zeros sub-second residue", () => {
    const subSecond = ZonedDateTime.from("2024-07-10T14:30:45.123456789[Europe/Paris]");
    const result = startOfMonth(subSecond);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
