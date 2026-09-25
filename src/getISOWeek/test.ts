import { describe, it, expect } from "vitest";
import { getISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getISOWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns ISO week", () => {
    expect(getISOWeek(date)).toBe(28);
  });

  it("returns the same week for a sub-second input as for the same input truncated to whole seconds", () => {
    const subSecond = ZonedDateTime.from("2024-07-10T14:30:45.123456789[Europe/Paris]");
    const wholeSecond = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    expect(getISOWeek(subSecond)).toBe(getISOWeek(wholeSecond));
  });

  it("returns week 1 for a sub-second January Monday", () => {
    expect(getISOWeek(ZonedDateTime.from("2024-01-01T00:00:00.123456789[Europe/Paris]"))).toBe(1);
  });
});
