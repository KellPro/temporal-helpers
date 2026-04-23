import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { previousMonday } from "../index.js";

describe("previousMonday", () => {
  it("returns the previous Monday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = previousMonday(date);
    expect(result.dayOfWeek).toBe(1);
    expect(result.day).toBe(8);
  });

  it("returns the same day if already Monday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-08T12:00:00[America/New_York]");
    const result = previousMonday(date);
    expect(result.day).toBe(8);
  });
});
