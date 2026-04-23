import { describe, it, expect } from "vitest";
import { getMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getMonth", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns month", () => {
    expect(getMonth(date)).toBe(7);
  });
});
