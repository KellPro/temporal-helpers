import { describe, it, expect } from "vitest";
import { differenceInBusinessDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInBusinessDays", () => {
  it("returns positive business days for later date", () => {
    const laterDate = ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]");
    const result = differenceInBusinessDays(laterDate, earlierDate);
    expect(result).toBeGreaterThan(0);
  });

  it("returns negative business days for earlier date", () => {
    const laterDate = ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]");
    const result = differenceInBusinessDays(laterDate, earlierDate);
    expect(result).toBeLessThan(0);
  });

  it("returns 0 for same date", () => {
    const date1 = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const date2 = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const result = differenceInBusinessDays(date1, date2);
    expect(result).toBe(0);
  });
});
