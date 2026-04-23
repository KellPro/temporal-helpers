import { describe, it, expect } from "vitest";
import { getDaysInMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getDaysInMonth", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns days in month", () => {
    expect(getDaysInMonth(date)).toBe(31);
  });
});
