import { describe, it, expect } from "vitest";
import { getDaysInYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getDaysInYear", () => {
  it("returns 365 for non-leap year", () => {
    const date = ZonedDateTime.from("2023-07-10T14:30:45[Europe/Paris]");
    expect(getDaysInYear(date)).toBe(365);
  });

  it("returns 366 for leap year", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    expect(getDaysInYear(date)).toBe(366);
  });
});
