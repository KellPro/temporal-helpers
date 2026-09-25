import { describe, it, expect } from "vitest";
import { startOfDecade } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfDecade", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of decade", () => {
    const result = startOfDecade(date);
    expect(result.year).toBe(2020);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });

  it("strips sub-second residue", () => {
    const date = ZonedDateTime.from("2024-07-10T12:34:56.789123456[Europe/Paris]");
    const result = startOfDecade(date);
    expect(result.millisecond).toBe(0);
    expect(result.microsecond).toBe(0);
    expect(result.nanosecond).toBe(0);
  });
});
