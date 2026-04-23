import { describe, it, expect } from "vitest";
import { lastDayOfISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfISOWeek", () => {
  it("returns last day of ISO week", () => {
    const date = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    const result = lastDayOfISOWeek(date);
    expect(result.day).toBe(21);
    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
  });

  it("handles Monday", () => {
    const date = ZonedDateTime.from("2024-01-08T12:00:00[Europe/Paris]");
    const result = lastDayOfISOWeek(date);
    expect(result.day).toBe(14);
  });
});
