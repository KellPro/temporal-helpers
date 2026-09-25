import { describe, it, expect } from "vitest";
import { differenceInHours } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInHours", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns hours between dates", () => {
    expect(differenceInHours(date3, date1)).toBe(48);
  });

  it("returns 0, not -0, for a reversed sub-hour span (date-fns #2555)", () => {
    const later = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T12:30:00[Europe/Paris]");
    const result = differenceInHours(later, earlier);
    expect(result).toBe(0);
    expect(Object.is(result, 0)).toBe(true);
  });
});
