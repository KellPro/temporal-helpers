import { describe, it, expect } from "vitest";
import { getISOWeekYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getISOWeekYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns ISO week year", () => {
    expect(getISOWeekYear(date)).toBe(2024);
  });
});
