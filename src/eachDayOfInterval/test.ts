import { describe, it, expect } from "vitest";
import { eachDayOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachDayOfInterval", () => {
  it("returns days in interval", () => {
    const start = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const end = ZonedDateTime.from("2024-07-14T12:00:00[Europe/Paris]");
    const result = eachDayOfInterval({ start, end });
    expect(result.length).toBe(5);
    expect(result[0].day).toBe(10);
    expect(result[4].day).toBe(14);
  });

  it("zeroes sub-second residue from emitted boundaries", () => {
    const start = ZonedDateTime.from("2024-07-10T12:00:00.123456789[Europe/Paris]");
    const end = ZonedDateTime.from("2024-07-12T12:00:00.123456789[Europe/Paris]");
    const result = eachDayOfInterval({ start, end });
    expect(result.length).toBe(3);
    for (const boundary of result) {
      expect(boundary.millisecond).toBe(0);
      expect(boundary.microsecond).toBe(0);
      expect(boundary.nanosecond).toBe(0);
    }
  });
});
