import { describe, expect, it } from "vitest";
import { Temporal } from "@js-temporal/polyfill";
import { previousThursday } from "../index.js";

describe("previousThursday", () => {
  it("returns the previous Thursday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-10T12:00:00[America/New_York]");
    const result = previousThursday(date);
    expect(result.dayOfWeek).toBe(4);
    expect(result.day).toBe(4);
  });

  it("goes back 7 days when already Thursday", () => {
    const date = Temporal.ZonedDateTime.from("2024-04-04T12:00:00[America/New_York]");
    const result = previousThursday(date);
    expect(result.dayOfWeek).toBe(4);
    expect(result.day).toBe(28);
  });
});
