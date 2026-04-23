import { describe, it, expect } from "vitest";
import { getISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getISOWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns ISO week", () => {
    expect(getISOWeek(date)).toBe(28);
  });
});
