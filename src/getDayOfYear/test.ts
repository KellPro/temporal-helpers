import { describe, it, expect } from "vitest";
import { getDayOfYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getDayOfYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns day of year", () => {
    expect(getDayOfYear(date)).toBe(192);
  });
});
