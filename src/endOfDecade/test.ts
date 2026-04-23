import { describe, it, expect } from "vitest";
import { endOfDecade } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfDecade", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of decade", () => {
    const result = endOfDecade(date);
    expect(result.year).toBe(2029);
    expect(result.month).toBe(12);
    expect(result.day).toBe(31);
  });
});
