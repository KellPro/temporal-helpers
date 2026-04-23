import { describe, it, expect } from "vitest";
import { isSame } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSame", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:30:45[UTC]");
  
  it("returns true for same year", () => {
    const sameYear = ZonedDateTime.from("2024-01-01T00:00:00[UTC]");
    expect(isSame(date1, sameYear, "year")).toBe(true);
  });

  it("returns false for different year", () => {
    const diffYear = ZonedDateTime.from("2025-07-10T12:00:00[UTC]");
    expect(isSame(date1, diffYear, "year")).toBe(false);
  });

  it("returns true for same month", () => {
    const sameMonth = ZonedDateTime.from("2024-07-01T00:00:00[UTC]");
    expect(isSame(date1, sameMonth, "month")).toBe(true);
  });

  it("returns true for same day", () => {
    const sameDay = ZonedDateTime.from("2024-07-10T18:00:00[UTC]");
    expect(isSame(date1, sameDay, "day")).toBe(true);
  });

  it("returns false for different day", () => {
    const diffDay = ZonedDateTime.from("2024-07-11T12:00:00[UTC]");
    expect(isSame(date1, diffDay, "day")).toBe(false);
  });

  it("returns true for same hour", () => {
    const sameHour = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
    expect(isSame(date1, sameHour, "hour")).toBe(true);
  });

  it("returns true for same minute", () => {
    const sameMinute = ZonedDateTime.from("2024-07-10T12:30:00[UTC]");
    expect(isSame(date1, sameMinute, "minute")).toBe(true);
  });

  it("returns true for same second", () => {
    const sameSecond = ZonedDateTime.from("2024-07-10T12:30:45[UTC]");
    expect(isSame(date1, sameSecond, "second")).toBe(true);
  });

  it("defaults to day unit", () => {
    const sameDay = ZonedDateTime.from("2024-07-10T18:00:00[UTC]");
    expect(isSame(date1, sameDay)).toBe(true);
  });
});
