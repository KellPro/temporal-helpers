import { describe, it, expect } from "vitest";
import { formatDistance } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatDistance", () => {
  const base = ZonedDateTime.from("2015-01-01T00:00:00[UTC]");

  it("returns less than a minute for equal dates", () => {
    expect(formatDistance(base, base)).toBe("less than a minute");
  });

  it("formats minutes", () => {
    const later = base.add({ minutes: 5 });
    expect(formatDistance(later, base)).toBe("5 minutes");
  });

  it("formats about hours", () => {
    const later = base.add({ hours: 2 });
    expect(formatDistance(later, base)).toBe("about 2 hours");
  });

  it("formats days", () => {
    const later = base.add({ days: 5 });
    expect(formatDistance(later, base)).toBe("5 days");
  });

  it("formats months", () => {
    const later = ZonedDateTime.from("2015-07-02T00:00:00[UTC]");
    const earlier = ZonedDateTime.from("2015-01-01T00:00:00[UTC]");
    expect(formatDistance(later, earlier)).toBe("6 months");
  });

  it("formats about years", () => {
    const later = ZonedDateTime.from("2016-01-01T00:00:00[UTC]");
    const earlier = ZonedDateTime.from("2015-01-01T00:00:00[UTC]");
    expect(formatDistance(later, earlier)).toBe("about 1 year");
  });

  it("includeSeconds bands", () => {
    expect(
      formatDistance(base.add({ seconds: 15 }), base, { includeSeconds: true }),
    ).toBe("less than 20 seconds");
    expect(
      formatDistance(base.add({ seconds: 30 }), base, { includeSeconds: true }),
    ).toBe("half a minute");
  });

  it("addSuffix for past", () => {
    const earlier = base.subtract({ years: 1 });
    expect(formatDistance(earlier, base, { addSuffix: true })).toBe(
      "about 1 year ago",
    );
  });

  it("addSuffix for future", () => {
    const later = base.add({ years: 1 });
    expect(formatDistance(later, base, { addSuffix: true })).toBe(
      "in about 1 year",
    );
  });
});
