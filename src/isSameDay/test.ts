import { describe, it, expect } from "vitest";
import { isSameDay } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameDay", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const sameDay = ZonedDateTime.from("2024-07-10T18:00:00[Europe/Paris]");
  const dateAfter = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");

  it("returns true for same day", () => {
    expect(isSameDay(date1, sameDay)).toBe(true);
  });

  it("returns false for different day", () => {
    expect(isSameDay(date1, dateAfter)).toBe(false);
  });
});
