import { describe, it, expect } from "vitest";
import { areIntervalsOverlapping } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("areIntervalsOverlapping", () => {
  it("returns true when intervals overlap", () => {
    const intervalLeft = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]"),
    };
    const intervalRight = {
      start: ZonedDateTime.from("2024-07-03T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
    };
    const result = areIntervalsOverlapping(intervalLeft, intervalRight);
    expect(result).toBe(true);
  });

  it("returns false when intervals do not overlap", () => {
    const intervalLeft = {
      start: ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]"),
    };
    const intervalRight = {
      start: ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]"),
    };
    const result = areIntervalsOverlapping(intervalLeft, intervalRight);
    expect(result).toBe(false);
  });
});
