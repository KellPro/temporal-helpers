import { describe, it, expect } from "vitest";
import { startOfHour } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfHour", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of hour", () => {
    const result = startOfHour(date);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
  });

  it("zeros sub-second residue", () => {
    const subSecond = ZonedDateTime.from("2024-07-10T14:30:45.123456789[Europe/Paris]");
    const result = startOfHour(subSecond);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
