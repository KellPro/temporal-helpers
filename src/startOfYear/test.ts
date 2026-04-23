import { describe, it, expect } from "vitest";
import { startOfYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of year", () => {
    const result = startOfYear(date);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });
});
