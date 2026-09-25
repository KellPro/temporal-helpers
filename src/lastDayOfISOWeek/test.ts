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

  it("ends at 23:59:59.999999999 on a fall-back Sunday", () => {
    // 2024-11-03 is the US fall-back Sunday: adding 23 exact hours to
    // midnight lands at 22:00, an hour before the end of that local day.
    const date = ZonedDateTime.from("2024-10-28T12:00:00[America/New_York]");
    expect(lastDayOfISOWeek(date).toString()).toBe(
      "2024-11-03T23:59:59.999999999-05:00[America/New_York]",
    );
  });
});
