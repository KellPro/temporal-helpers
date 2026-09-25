import { describe, it, expect } from "vitest";
import { differenceInMinutes } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInMinutes", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date2 = ZonedDateTime.from("2024-07-10T12:01:00[Europe/Paris]");

  it("returns minutes between dates", () => {
    expect(differenceInMinutes(date2, date1)).toBe(1);
  });

  it("returns 0, not -0, for a reversed sub-minute span (date-fns #2555)", () => {
    const later = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const earlier = ZonedDateTime.from("2024-07-10T12:00:30[Europe/Paris]");
    const result = differenceInMinutes(later, earlier);
    expect(result).toBe(0);
    expect(Object.is(result, 0)).toBe(true);
  });
});
