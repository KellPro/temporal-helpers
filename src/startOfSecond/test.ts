import { describe, it, expect } from "vitest";
import { startOfSecond } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfSecond", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of second", () => {
    const result = startOfSecond(date);
    expect(result.nanosecond).toBe(0);
  });

  it("zeros sub-second residue", () => {
    const subSecond = ZonedDateTime.from("2024-07-10T14:30:45.123456789[Europe/Paris]");
    const result = startOfSecond(subSecond);
    expect(result.second).toBe(45);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
