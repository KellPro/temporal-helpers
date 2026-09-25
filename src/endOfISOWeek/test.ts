import { describe, it, expect } from "vitest";
import { endOfISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfISOWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of ISO week", () => {
    const result = endOfISOWeek(date);
    expect(result.day).toBe(14);
    expect(result.millisecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.nanosecond).toBe(999);
  });
});
