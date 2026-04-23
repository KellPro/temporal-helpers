import { describe, it, expect } from "vitest";
import { isThisQuarter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThisQuarter", () => {
  it("returns true for same quarter as reference", () => {
    const date = ZonedDateTime.from("2024-02-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isThisQuarter(date, reference)).toBe(true);
  });

  it("returns false for different quarter", () => {
    const date = ZonedDateTime.from("2024-05-15T12:00:00[Europe/Paris]");
    const reference = ZonedDateTime.from("2024-01-15T12:00:00[Europe/Paris]");
    expect(isThisQuarter(date, reference)).toBe(false);
  });
});
