import { describe, it, expect } from "vitest";
import { lastDayOfQuarter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lastDayOfQuarter", () => {
  it("returns last day of Q1", () => {
    const date = ZonedDateTime.from("2024-02-15T12:00:00[Europe/Paris]");
    const result = lastDayOfQuarter(date);
    expect(result.month).toBe(3);
    expect(result.day).toBe(31);
  });

  it("returns last day of Q2", () => {
    const date = ZonedDateTime.from("2024-05-15T12:00:00[Europe/Paris]");
    const result = lastDayOfQuarter(date);
    expect(result.month).toBe(6);
    expect(result.day).toBe(30);
  });

  it("returns last day of Q3", () => {
    const date = ZonedDateTime.from("2024-08-15T12:00:00[Europe/Paris]");
    const result = lastDayOfQuarter(date);
    expect(result.month).toBe(9);
    expect(result.day).toBe(30);
  });

  it("returns last day of Q4", () => {
    const date = ZonedDateTime.from("2024-11-15T12:00:00[Europe/Paris]");
    const result = lastDayOfQuarter(date);
    expect(result.month).toBe(12);
    expect(result.day).toBe(31);
  });
});
