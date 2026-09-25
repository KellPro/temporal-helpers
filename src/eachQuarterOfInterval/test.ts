import { describe, it, expect } from "vitest";
import { eachQuarterOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachQuarterOfInterval", () => {
  it("returns all four quarter starts for a full-year interval", () => {
    const result = eachQuarterOfInterval({
      start: ZonedDateTime.from("2024-01-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-12-31T18:00:00[Europe/Paris]"),
    });
    expect(result.map((d) => d.toString())).toEqual([
      "2024-01-01T00:00:00+01:00[Europe/Paris]",
      "2024-04-01T00:00:00+02:00[Europe/Paris]",
      "2024-07-01T00:00:00+02:00[Europe/Paris]",
      "2024-10-01T00:00:00+02:00[Europe/Paris]",
    ]);
  });

  it("returns quarter starts for an interval starting and ending mid-quarter", () => {
    const result = eachQuarterOfInterval({
      start: ZonedDateTime.from("2024-03-06T06:35:00[America/New_York]"),
      end: ZonedDateTime.from("2024-08-12T22:15:00[America/New_York]"),
    });
    expect(result.map((d) => d.toString())).toEqual([
      "2024-01-01T00:00:00-05:00[America/New_York]",
      "2024-04-01T00:00:00-04:00[America/New_York]",
      "2024-07-01T00:00:00-04:00[America/New_York]",
    ]);
  });

  it("returns one quarter when both dates fall in the same quarter", () => {
    const result = eachQuarterOfInterval({
      start: ZonedDateTime.from("2024-01-06T14:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-02-09T15:00:00[Europe/Paris]"),
    });
    expect(result.map((d) => d.toString())).toEqual([
      "2024-01-01T00:00:00+01:00[Europe/Paris]",
    ]);
  });

  it("returns the quarter start when start and end are equal", () => {
    const instant = ZonedDateTime.from("2024-10-06T14:00:00[America/New_York]");
    const result = eachQuarterOfInterval({ start: instant, end: instant });
    expect(result.map((d) => d.toString())).toEqual([
      "2024-10-01T00:00:00-04:00[America/New_York]",
    ]);
  });

  it("throws when start is after end", () => {
    expect(() =>
      eachQuarterOfInterval({
        start: ZonedDateTime.from("2024-08-12T00:00:00[Europe/Paris]"),
        end: ZonedDateTime.from("2024-03-06T00:00:00[Europe/Paris]"),
      }),
    ).toThrow(RangeError);
  });

  it("handles an interval crossing a year boundary", () => {
    const result = eachQuarterOfInterval({
      start: ZonedDateTime.from("2024-11-15T12:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2025-02-20T12:00:00[Europe/Paris]"),
    });
    expect(result.map((d) => d.toString())).toEqual([
      "2024-10-01T00:00:00+02:00[Europe/Paris]",
      "2025-01-01T00:00:00+01:00[Europe/Paris]",
    ]);
  });
});
