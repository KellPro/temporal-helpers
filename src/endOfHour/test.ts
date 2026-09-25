import { describe, it, expect } from "vitest";
import { endOfHour } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfHour", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of hour", () => {
    const result = endOfHour(date);
    expect(result.minute).toBe(59);
    expect(result.second).toBe(59);
  });

  it("completes sub-second precision", () => {
    const date = ZonedDateTime.from("2024-07-10T12:34:56.123456[Europe/Paris]");
    const result = endOfHour(date);
    expect(result.millisecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.nanosecond).toBe(999);
  });
});
