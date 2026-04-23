import { describe, it, expect } from "vitest";
import { startOfWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of week", () => {
    const result = startOfWeek(date);
    expect(result.day).toBeGreaterThanOrEqual(7);
    expect(result.day).toBeLessThanOrEqual(8);
  });
});
