import { describe, it, expect } from "vitest";
import { isSameHour } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameHour", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const sameHour = ZonedDateTime.from("2024-07-10T12:30:00[Europe/Paris]");
  const diffHour = ZonedDateTime.from("2024-07-10T13:00:00[Europe/Paris]");

  it("returns true for same hour", () => {
    expect(isSameHour(date1, sameHour)).toBe(true);
  });

  it("returns false for different hour", () => {
    expect(isSameHour(date1, diffHour)).toBe(false);
  });
});
