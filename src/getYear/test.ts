import { describe, it, expect } from "vitest";
import { getYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getYear", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns year", () => {
    expect(getYear(date)).toBe(2024);
  });
});
