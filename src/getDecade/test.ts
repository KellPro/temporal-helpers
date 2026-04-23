import { describe, it, expect } from "vitest";
import { getDecade } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getDecade", () => {
  it("returns decade for given year", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    expect(getDecade(date)).toBe(202);
  });

  it("returns decade for year in 1990s", () => {
    const date = ZonedDateTime.from("1999-07-10T14:30:45[Europe/Paris]");
    expect(getDecade(date)).toBe(199);
  });
});
