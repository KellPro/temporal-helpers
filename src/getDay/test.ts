import { describe, it, expect } from "vitest";
import { getDay } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getDay", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns day of week", () => {
    expect(getDay(date)).toBe(3); // Wednesday
  });
});
