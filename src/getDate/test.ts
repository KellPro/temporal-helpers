import { describe, it, expect } from "vitest";
import { getDate } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getDate", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns date", () => {
    expect(getDate(date)).toBe(10);
  });
});
