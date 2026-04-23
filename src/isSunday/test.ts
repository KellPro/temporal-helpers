import { describe, it, expect } from "vitest";
import { isSunday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSunday", () => {
  const sunday = ZonedDateTime.from("2024-07-07T12:00:00[Europe/Paris]");

  it("returns true for Sunday", () => {
    expect(isSunday(sunday)).toBe(true);
  });
});
