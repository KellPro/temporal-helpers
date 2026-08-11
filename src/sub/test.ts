import { describe, it, expect } from "vitest";
import { sub } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("sub", () => {
  it("subtracts a multi-field duration", () => {
    const date = ZonedDateTime.from("2017-06-15T15:29:20[UTC]");
    const result = sub(date, {
      years: 2,
      months: 9,
      weeks: 1,
      days: 7,
      hours: 5,
      minutes: 9,
      seconds: 30,
    });
    expect(result.toString()).toBe("2014-09-01T10:19:50+00:00[UTC]");
  });

  it("returns the same instant for zero duration", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const result = sub(date, {});
    expect(result.epochMilliseconds).toBe(date.epochMilliseconds);
  });

  it("supports milliseconds", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:01.500[UTC]");
    const result = sub(date, { milliseconds: 1500 });
    expect(result.second).toBe(0);
    expect(result.millisecond).toBe(0);
  });
});
