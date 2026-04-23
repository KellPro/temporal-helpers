import { describe, it, expect } from "vitest";
import { isSameMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameMonth", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const sameMonth = ZonedDateTime.from("2024-07-15T14:00:00[Europe/Paris]");
  const diffMonth = ZonedDateTime.from("2024-08-10T12:00:00[Europe/Paris]");

  it("returns true for same month", () => {
    expect(isSameMonth(date1, sameMonth)).toBe(true);
  });

  it("returns false for different month", () => {
    expect(isSameMonth(date1, diffMonth)).toBe(false);
  });
});
