import { describe, it, expect } from "vitest";
import { set } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("set", () => {
  it("sets multiple fields with Temporal names", () => {
    const date = ZonedDateTime.from("2014-09-20T01:23:45[UTC]");
    const result = set(date, { year: 2015, month: 10, day: 20 });
    expect(result.toString()).toBe("2015-10-20T01:23:45+00:00[UTC]");
  });

  it("accepts date-fns day and time aliases", () => {
    const date = ZonedDateTime.from("2014-09-01T01:23:45[UTC]");
    const result = set(date, { date: 15, hours: 12, minutes: 0, seconds: 0 });
    expect(result.day).toBe(15);
    expect(result.hour).toBe(12);
    expect(result.minute).toBe(0);
    expect(result.second).toBe(0);
  });

  it("uses 1-based months", () => {
    const date = ZonedDateTime.from("2014-09-01T00:00:00[UTC]");
    const result = set(date, { month: 1 });
    expect(result.month).toBe(1);
  });

  it("throws when both day aliases are passed", () => {
    const date = ZonedDateTime.from("2014-09-01T00:00:00[UTC]");
    expect(() => set(date, { day: 1, date: 2 })).toThrow(RangeError);
  });

  it("throws when both hour aliases are passed", () => {
    const date = ZonedDateTime.from("2014-09-01T00:00:00[UTC]");
    expect(() => set(date, { hour: 1, hours: 2 })).toThrow(RangeError);
  });

  it("returns same instant when values empty", () => {
    const date = ZonedDateTime.from("2014-09-01T00:00:00[UTC]");
    expect(set(date, {}).epochMilliseconds).toBe(date.epochMilliseconds);
  });
});
