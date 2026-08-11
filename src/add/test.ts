import { describe, it, expect } from "vitest";
import { add } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("add", () => {
  it("adds a multi-field duration", () => {
    const date = ZonedDateTime.from("2014-09-01T10:19:50[UTC]");
    const result = add(date, {
      years: 2,
      months: 9,
      weeks: 1,
      days: 7,
      hours: 5,
      minutes: 9,
      seconds: 30,
    });
    expect(result.toString()).toBe("2017-06-15T15:29:20+00:00[UTC]");
  });

  it("returns the same instant for zero duration", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const result = add(date, {});
    expect(result.epochMilliseconds).toBe(date.epochMilliseconds);
  });

  it("handles month-end overflow", () => {
    const date = ZonedDateTime.from("2024-01-31T12:00:00[UTC]");
    const result = add(date, { months: 1 });
    expect(result.month).toBe(2);
    expect(result.day).toBe(29);
  });

  it("supports milliseconds", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
    const result = add(date, { milliseconds: 1500 });
    expect(result.second).toBe(1);
    expect(result.millisecond).toBe(500);
  });

  it("supports negative fields", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
    const result = add(date, { days: -5 });
    expect(result.day).toBe(5);
  });
});
