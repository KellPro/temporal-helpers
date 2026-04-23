import { describe, it, expect } from "vitest";
import { isWeekend } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isWeekend", () => {
  const wednesday = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const saturday = ZonedDateTime.from("2024-07-06T12:00:00[Europe/Paris]");
  const sunday = ZonedDateTime.from("2024-07-07T12:00:00[Europe/Paris]");

  it("returns true for Saturday", () => {
    expect(isWeekend(saturday)).toBe(true);
  });

  it("returns true for Sunday", () => {
    expect(isWeekend(sunday)).toBe(true);
  });

  it("returns false for weekday", () => {
    expect(isWeekend(wednesday)).toBe(false);
  });
});
