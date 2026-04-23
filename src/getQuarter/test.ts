import { describe, it, expect } from "vitest";
import { getQuarter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getQuarter", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns quarter", () => {
    expect(getQuarter(date)).toBe(3);
  });
});
