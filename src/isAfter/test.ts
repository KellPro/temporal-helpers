import { describe, it, expect } from "vitest";
import { isAfter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isAfter", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const dateAfter = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");
  const dateBefore = ZonedDateTime.from("2024-07-09T12:00:00[Europe/Paris]");

  it("returns true when first date is after", () => {
    expect(isAfter(dateAfter, date1)).toBe(true);
  });

  it("returns false when first date is before", () => {
    expect(isAfter(dateBefore, date1)).toBe(false);
  });
});
