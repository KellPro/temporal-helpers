import { describe, it, expect } from "vitest";
import { isValid } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isValid", () => {
  it("returns true for valid date", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(isValid(date)).toBe(true);
  });
});
