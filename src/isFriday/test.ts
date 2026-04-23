import { describe, it, expect } from "vitest";
import { isFriday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isFriday", () => {
  const friday = ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]");

  it("returns true for Friday", () => {
    expect(isFriday(friday)).toBe(true);
  });
});
