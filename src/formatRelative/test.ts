import { describe, it, expect } from "vitest";
import { formatRelative } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatRelative", () => {
  const base = ZonedDateTime.from("2015-01-07T12:00:00[UTC]"); // Wednesday

  it("formats today", () => {
    const date = ZonedDateTime.from("2015-01-07T16:30:00[UTC]");
    expect(formatRelative(date, base)).toBe("today at 4:30 PM");
  });

  it("formats yesterday", () => {
    const date = ZonedDateTime.from("2015-01-06T04:30:00[UTC]");
    expect(formatRelative(date, base)).toBe("yesterday at 4:30 AM");
  });

  it("formats tomorrow", () => {
    const date = ZonedDateTime.from("2015-01-08T09:00:00[UTC]");
    expect(formatRelative(date, base)).toBe("tomorrow at 9:00 AM");
  });

  it("formats last week weekday", () => {
    const date = ZonedDateTime.from("2015-01-04T12:45:00[UTC]"); // Sunday
    expect(formatRelative(date, base)).toBe("last Sunday at 12:45 PM");
  });

  it("formats next week weekday", () => {
    const date = ZonedDateTime.from("2015-01-10T08:00:00[UTC]"); // Saturday
    expect(formatRelative(date, base)).toBe("Saturday at 8:00 AM");
  });

  it("formats other as MM/dd/yyyy", () => {
    const date = ZonedDateTime.from("2014-12-01T12:00:00[UTC]");
    expect(formatRelative(date, base)).toBe("12/01/2014");
  });

  it("throws for unsupported locale", () => {
    expect(() =>
      formatRelative(base, base, { locale: "fr-FR" }),
    ).toThrow(RangeError);
  });

  it("projects onto baseDate time zone", () => {
    const baseParis = ZonedDateTime.from("2015-01-07T01:00:00[Europe/Paris]");
    const dateNy = ZonedDateTime.from("2015-01-06T20:00:00[America/New_York]");
    // same instant-ish calendar day in Paris: Jan 7 early morning vs NY Jan 6 evening
    // date projected to Paris: 2015-01-07T02:00 Paris → today
    expect(formatRelative(dateNy, baseParis)).toMatch(/^today at/);
  });
});
