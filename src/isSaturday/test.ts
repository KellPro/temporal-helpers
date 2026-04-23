import { describe, it, expect } from "vitest";
import { isSaturday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSaturday", () => {
  const saturday = ZonedDateTime.from("2024-07-06T12:00:00[Europe/Paris]");

  it("returns true for Saturday", () => {
    expect(isSaturday(saturday)).toBe(true);
  });
});
