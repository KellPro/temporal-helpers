import { describe, it, expect } from "vitest";
import { startOfDay } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfDay", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of day", () => {
    const result = startOfDay(date);
    expect(result.hour).toBe(0);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
  });

  it("zeros sub-second residue", () => {
    const subSecond = ZonedDateTime.from("2024-07-10T14:30:45.123456789[Europe/Paris]");
    const result = startOfDay(subSecond);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
