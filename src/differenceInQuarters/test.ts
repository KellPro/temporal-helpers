import { describe, it, expect } from "vitest";
import { differenceInQuarters } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInQuarters", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns quarters between dates", () => {
    const oct = ZonedDateTime.from("2024-10-10T12:00:00[Europe/Paris]");
    expect(differenceInQuarters(oct, date1)).toBe(1);
  });

  it("counts 3 quarters when 10:00 has not reached 18:00", () => {
    const later = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
    const earlier = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
    expect(differenceInQuarters(later, earlier)).toBe(3);
  });

  it("returns -3 for that anniversary reversed", () => {
    const later = ZonedDateTime.from("2024-03-01T18:00:00[Asia/Tokyo]");
    const earlier = ZonedDateTime.from("2025-03-01T10:00:00[America/New_York]");
    expect(differenceInQuarters(later, earlier)).toBe(-3);
  });

  it("returns 0, not -0, for a single reversed month (date-fns #2555)", () => {
    // -1 month: -1/3 truncates to -0
    const later = ZonedDateTime.from("2021-09-30T00:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2021-10-31T00:00:00[Europe/Paris]");
    const result = differenceInQuarters(later, earlier);
    expect(result).toBe(0);
    expect(Object.is(result, 0)).toBe(true);
  });
});
