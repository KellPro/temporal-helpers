import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { setISOWeek, getISOWeek } from "../index.js";

describe("setISOWeek", () => {
  it("sets the ISO week", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setISOWeek(date, 25);
    expect(getISOWeek(result)).toBe(25);
  });

  it("preserves other date components", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = setISOWeek(date, 1);
    expect(result.year).toBe(2024);
    expect(result.hour).toBe(14);
    expect(result.minute).toBe(30);
  });
});
