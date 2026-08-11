import { describe, it, expect } from "vitest";
import { intlFormatDistance } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("intlFormatDistance", () => {
  it("formats hours in the future", () => {
    const earlier = ZonedDateTime.from("1986-04-04T10:30:00[UTC]");
    const later = ZonedDateTime.from("1986-04-04T11:30:00[UTC]");
    expect(intlFormatDistance(later, earlier)).toBe("in 1 hour");
  });

  it("formats hours in the past", () => {
    const later = ZonedDateTime.from("1986-04-04T10:30:00[UTC]");
    const earlier = ZonedDateTime.from("1986-04-04T11:30:00[UTC]");
    expect(intlFormatDistance(later, earlier)).toBe("1 hour ago");
  });

  it("formats days", () => {
    const earlier = ZonedDateTime.from("1986-04-04T10:30:00[UTC]");
    const later = ZonedDateTime.from("1986-04-05T10:30:00[UTC]");
    expect(intlFormatDistance(later, earlier)).toMatch(/tomorrow|in 1 day/);
  });

  it("supports forced unit", () => {
    const earlier = ZonedDateTime.from("1986-04-04T10:30:00[UTC]");
    const later = ZonedDateTime.from("1987-07-04T10:30:00[UTC]");
    expect(intlFormatDistance(later, earlier, { unit: "quarter" })).toBe(
      "in 5 quarters",
    );
  });

  it("supports numeric always", () => {
    const earlier = ZonedDateTime.from("1986-04-04T11:30:00[UTC]");
    const later = ZonedDateTime.from("1986-04-05T11:30:00[UTC]");
    expect(
      intlFormatDistance(later, earlier, { numeric: "always" }),
    ).toBe("in 1 day");
  });
});
