import { describe, it, expect } from "vitest";
import { differenceInSeconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInSeconds", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date2 = ZonedDateTime.from("2024-07-10T12:01:00[Europe/Paris]");

  it("returns seconds between dates", () => {
    expect(differenceInSeconds(date2, date1)).toBe(60);
  });

  it("returns negative when reversed", () => {
    expect(differenceInSeconds(date1, date2)).toBe(-60);
  });

  it("returns 0, not -0, for a reversed sub-second span (date-fns #2555)", () => {
    const a = ZonedDateTime.from("2021-07-22T06:01:28.973[Europe/Paris]");
    const b = ZonedDateTime.from("2021-07-22T06:01:28.976[Europe/Paris]");
    const result = differenceInSeconds(a, b);
    expect(result).toBe(0);
    expect(Object.is(result, 0)).toBe(true);
  });
});
