import { describe, it, expect } from "vitest";
import { getHours } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getHours", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns hours", () => {
    expect(getHours(date)).toBe(14);
  });
});
