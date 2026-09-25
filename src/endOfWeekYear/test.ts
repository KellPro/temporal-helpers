import { describe, it, expect } from "vitest";
import { endOfWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfWeekYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of week year", () => {
    // Sunday-start week-year 2024 ends the Saturday before the week containing
    // 2025-01-01, which is 2024-12-28.
    const result = endOfWeekYear(date);
    expect(result.toString()).toBe(
      "2024-12-28T23:59:59.999999999+01:00[Europe/Paris]",
    );
  });

  it("uses the week-year of a late-December date, not its calendar year", () => {
    const december = ZonedDateTime.from("2024-12-30T12:00:00[UTC]");
    expect(endOfWeekYear(december).toString()).toBe(
      "2025-12-27T23:59:59.999999999+00:00[UTC]",
    );
  });

  it("completes sub-second precision", () => {
    const date = ZonedDateTime.from("2024-07-10T12:34:56.123456[Europe/Paris]");
    const result = endOfWeekYear(date);
    expect(result.millisecond).toBe(999);
    expect(result.microsecond).toBe(999);
    expect(result.nanosecond).toBe(999);
  });
});
