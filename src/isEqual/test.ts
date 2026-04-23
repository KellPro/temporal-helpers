import { describe, it, expect } from "vitest";
import { isEqual } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isEqual", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date2 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const dateAfter = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");

  it("returns true when dates are equal", () => {
    expect(isEqual(date1, date2)).toBe(true);
  });

  it("returns false when dates are not equal", () => {
    expect(isEqual(date1, dateAfter)).toBe(false);
  });
});
