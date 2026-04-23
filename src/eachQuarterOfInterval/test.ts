import { describe, it, expect } from "vitest";
import { eachQuarterOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachQuarterOfInterval", () => {
  it("returns array of quarters in interval", () => {
    const interval = {
      start: ZonedDateTime.from("2024-01-01T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-12-31T10:00:00[Europe/Paris]"),
    };
    const result = eachQuarterOfInterval(interval);
    expect(result.length).toBe(2);
  });

  it("returns single element for same quarter", () => {
    const interval = {
      start: ZonedDateTime.from("2024-03-15T10:00:00[Europe/Paris]"),
      end: ZonedDateTime.from("2024-05-20T10:00:00[Europe/Paris]"),
    };
    const result = eachQuarterOfInterval(interval);
    expect(result.length).toBe(1);
    expect(result[0].month).toBe(1);
  });
});
