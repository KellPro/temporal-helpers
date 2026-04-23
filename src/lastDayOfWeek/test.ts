import { describe, it, expect } from "vitest";
import { lastDayOfWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns last day of week", () => {
    const result = lastDayOfWeek(date);
    expect(result.day).toBe(14);
  });
});
