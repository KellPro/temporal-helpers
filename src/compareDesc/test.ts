import { describe, it, expect } from "vitest";
import { compareDesc } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("compareDesc", () => {
  it("returns negative when left is after right", () => {
    const dateLeft = ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]");
    const dateRight = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const result = compareDesc(dateLeft, dateRight);
    expect(result).toBeLessThan(0);
  });

  it("returns positive when left is before right", () => {
    const dateLeft = ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]");
    const dateRight = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const result = compareDesc(dateLeft, dateRight);
    expect(result).toBeGreaterThan(0);
  });

  it("returns 0 for equal dates", () => {
    const dateLeft = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const dateRight = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const result = compareDesc(dateLeft, dateRight);
    expect(result).toBe(0);
  });
});
