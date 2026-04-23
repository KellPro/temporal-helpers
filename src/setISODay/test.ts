import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { setISODay } from "../index.js";

describe("setISODay", () => {
  it("sets the ISO day of the week", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setISODay(date, 1);
    expect(result.dayOfWeek).toBe(1);
  });

  it("preserves other date components", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = setISODay(date, 5);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(4);
    expect(result.hour).toBe(14);
    expect(result.minute).toBe(30);
  });
});
