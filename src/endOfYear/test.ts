import { describe, it, expect } from "vitest";
import { endOfYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of year", () => {
    const result = endOfYear(date);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(12);
    expect(result.day).toBe(31);
  });
});
