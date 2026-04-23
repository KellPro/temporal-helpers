import { describe, it, expect } from "vitest";
import { isDate } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isDate", () => {
  it("returns true for a ZonedDateTime", () => {
    const date = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
    expect(isDate(date)).toBe(true);
  });

  it("returns false for a string", () => {
    expect(isDate("2024-07-10")).toBe(false);
  });

  it("returns false for a number", () => {
    expect(isDate(123)).toBe(false);
  });

  it("returns false for null", () => {
    expect(isDate(null)).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isDate(undefined)).toBe(false);
  });

  it("returns false for an object", () => {
    expect(isDate({})).toBe(false);
  });
});
