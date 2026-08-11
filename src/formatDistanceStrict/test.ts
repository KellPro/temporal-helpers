import { describe, it, expect } from "vitest";
import { formatDistanceStrict } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatDistanceStrict", () => {
  const base = ZonedDateTime.from("2015-01-01T00:00:00[UTC]");

  it("formats seconds", () => {
    expect(formatDistanceStrict(base.add({ seconds: 15 }), base)).toBe(
      "15 seconds",
    );
  });

  it("formats minutes", () => {
    expect(formatDistanceStrict(base.add({ minutes: 5 }), base)).toBe(
      "5 minutes",
    );
  });

  it("formats hours", () => {
    expect(formatDistanceStrict(base.add({ hours: 3 }), base)).toBe("3 hours");
  });

  it("formats days", () => {
    expect(formatDistanceStrict(base.add({ days: 5 }), base)).toBe("5 days");
  });

  it("formats months", () => {
    const later = ZonedDateTime.from("2015-07-02T00:00:00[UTC]");
    expect(formatDistanceStrict(later, base)).toBe("6 months");
  });

  it("formats years", () => {
    const later = ZonedDateTime.from("2016-01-01T00:00:00[UTC]");
    expect(formatDistanceStrict(later, base)).toBe("1 year");
  });

  it("forces unit", () => {
    const later = ZonedDateTime.from("2016-01-01T00:00:00[UTC]");
    expect(formatDistanceStrict(later, base, { unit: "minute" })).toBe(
      "525600 minutes",
    );
  });

  it("supports roundingMethod ceil", () => {
    const later = ZonedDateTime.from("2015-01-28T00:00:00[UTC]");
    expect(
      formatDistanceStrict(later, base, {
        unit: "month",
        roundingMethod: "ceil",
      }),
    ).toBe("1 month");
  });

  it("addSuffix for past", () => {
    const earlier = ZonedDateTime.from("2014-01-01T00:00:00[UTC]");
    expect(formatDistanceStrict(earlier, base, { addSuffix: true })).toBe(
      "1 year ago",
    );
  });

  it("addSuffix for future", () => {
    const later = ZonedDateTime.from("2016-01-01T00:00:00[UTC]");
    expect(formatDistanceStrict(later, base, { addSuffix: true })).toBe(
      "in 1 year",
    );
  });
});
