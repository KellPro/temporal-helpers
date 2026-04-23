import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { setDay } from "../index.js";

describe("setDay", () => {
  it("sets the day of the month", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = setDay(date, 15);
    expect(result.day).toBe(15);
  });

  it("preserves other date components", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T14:30:00[America/New_York]");
    const result = setDay(date, 1);
    expect(result.year).toBe(2024);
    expect(result.month).toBe(4);
    expect(result.hour).toBe(14);
    expect(result.minute).toBe(30);
  });
});
