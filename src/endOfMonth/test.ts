import { describe, it, expect } from "vitest";
import { endOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfMonth", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of month", () => {
    const result = endOfMonth(date);
    expect(result.month).toBe(7);
    expect(result.day).toBe(31);
  });
});
