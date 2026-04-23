import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { previousFriday } from "../index.js";

describe("previousFriday", () => {
  it("returns the previous Friday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = previousFriday(date);
    expect(result.dayOfWeek).toBe(5);
    expect(result.day).toBe(5);
  });

  it("returns the same day if already Friday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-05T12:00:00[America/New_York]");
    const result = previousFriday(date);
    expect(result.day).toBe(5);
  });
});
