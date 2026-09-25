import { describe, it, expect } from "vitest";
import { startOfQuarter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfQuarter", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of quarter", () => {
    const result = startOfQuarter(date);
    expect(result.month).toBe(7);
    expect(result.day).toBe(1);
  });

  it("strips sub-second residue", () => {
    const date = ZonedDateTime.from("2024-07-10T12:34:56.789123456[Europe/Paris]");
    const result = startOfQuarter(date);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
