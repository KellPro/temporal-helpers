import { describe, it, expect } from "vitest";
import { differenceInBusinessDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInBusinessDays", () => {
  it("returns positive business days for later date", () => {
    const laterDate = ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]");
    const result = differenceInBusinessDays(laterDate, earlierDate);
    expect(result).toBe(7);
  });

  it("does not count a crossed Sunday", () => {
    // Wed Jul 3 -> Mon Jul 8 2024: Wed, Thu, Fri, Mon count; Sat (6) and Sun (7) do not.
    const laterDate = ZonedDateTime.from("2024-07-08T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-03T10:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(3);
  });

  it("does not count a crossed Saturday", () => {
    // Fri Jul 5 -> Mon Jul 8 2024: Fri and Mon count; Sat (6) and Sun (7) do not.
    const laterDate = ZonedDateTime.from("2024-07-08T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(1);
  });

  it("returns 0 for same date", () => {
    const date1 = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const date2 = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const result = differenceInBusinessDays(date1, date2);
    expect(result).toBe(0);
  });

  it("returns 0 for same-day Saturday", () => {
    const laterDate = ZonedDateTime.from("2024-07-06T18:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-06T09:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(0);
  });

  it("returns 0 for same-day Sunday", () => {
    const laterDate = ZonedDateTime.from("2024-07-07T18:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-07T09:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(0);
  });

  it("returns negative business days for reversed-order input", () => {
    // Mirror of the crossed-Sunday case: Wed Jul 3 -> Mon Jul 8 reversed.
    const laterDate = ZonedDateTime.from("2024-07-03T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-08T10:00:00[Europe/Paris]");
    const result = differenceInBusinessDays(laterDate, earlierDate);
    expect(result).toBe(-3);
  });

  it("counts a Friday when the later date is Saturday", () => {
    // Walk Fri Jul 5 -> Sat Jul 6: Friday is a business day, Saturday is not counted.
    const laterDate = ZonedDateTime.from("2024-07-06T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(1);
  });

  it("returns 0 when the span is only Saturday to Sunday", () => {
    const laterDate = ZonedDateTime.from("2024-07-07T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-06T10:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(0);
  });

  it("counts every weekday when the later date is a weekend", () => {
    // Mon Jul 1 -> Sat Jul 6: Mon through Fri, and Saturday is not counted.
    const laterDate = ZonedDateTime.from("2024-07-06T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(5);
  });

  it("counts every weekday walked when moving backward onto a weekend", () => {
    // Fri Jul 12 -> Sun Jul 7: Fri, Thu, Wed, Tue, Mon.
    const laterDate = ZonedDateTime.from("2024-07-07T10:00:00[Europe/Paris]");
    const earlierDate = ZonedDateTime.from("2024-07-12T10:00:00[Europe/Paris]");
    expect(differenceInBusinessDays(laterDate, earlierDate)).toBe(-5);
  });

  it("returns 0 for the same wall-clock day in different zones", () => {
    const newYork = ZonedDateTime.from("2024-07-10T00:00:00[America/New_York]");
    const auckland = ZonedDateTime.from("2024-07-10T00:00:00[Pacific/Auckland]");
    expect(differenceInBusinessDays(newYork, auckland)).toBe(0);
    expect(differenceInBusinessDays(auckland, newYork)).toBe(0);
  });
});
