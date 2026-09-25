import { describe, it, expect } from "vitest";
import { getISOWeeksInYear } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getISOWeeksInYear", () => {
  it("returns 53 for long ISO week-numbering years (2015)", () => {
    const date = ZonedDateTime.from("2015-02-11T14:30:45[Europe/Paris]");
    expect(getISOWeeksInYear(date)).toBe(53);
  });

  it("returns 53 for long ISO week-numbering years (2020)", () => {
    const date = ZonedDateTime.from("2020-07-10T09:00:00[America/New_York]");
    expect(getISOWeeksInYear(date)).toBe(53);
  });

  it("returns 52 for regular ISO week-numbering years (2024)", () => {
    const date = ZonedDateTime.from("2024-01-01T00:00:00[Europe/London]");
    expect(getISOWeeksInYear(date)).toBe(52);
  });

  it("returns 52 for a mid-year date in a regular year", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    expect(getISOWeeksInYear(date)).toBe(52);
  });

  it("counts the ISO week-numbering year, not the calendar year (Dec 30 2003 is in ISO 2004)", () => {
    const date = ZonedDateTime.from("2003-12-30T12:00:00[Europe/Paris]");
    expect(getISOWeeksInYear(date)).toBe(53);
  });

  it("Jan 1 in a Fri/Sat/Sun-January year belongs to the previous ISO week year (Jan 1 2021 is in ISO 2020)", () => {
    const date = ZonedDateTime.from("2021-01-01T00:00:00[America/New_York]");
    expect(getISOWeeksInYear(date)).toBe(53);
  });

  it("Dec 31 of a long ISO week year still counts that year (Dec 31 2015 is in ISO 2015)", () => {
    const date = ZonedDateTime.from("2015-12-31T23:59:00[Europe/Paris]");
    expect(getISOWeeksInYear(date)).toBe(53);
  });

  it("Dec 31 of a long ISO week year counts it even right after a leap December (Dec 31 2020 is in ISO 2020)", () => {
    const date = ZonedDateTime.from("2020-12-31T12:00:00[Europe/Paris]");
    expect(getISOWeeksInYear(date)).toBe(53);
  });

  it("Dec 31 can already belong to the next ISO week year (Dec 31 2024 is in ISO 2025)", () => {
    const date = ZonedDateTime.from("2024-12-31T23:30:00[America/New_York]");
    expect(getISOWeeksInYear(date)).toBe(52);
  });

  it("Jan 1 can still belong to the previous ISO week year (Jan 1 2023 is in ISO 2022)", () => {
    const date = ZonedDateTime.from("2023-01-01T12:00:00[Europe/Paris]");
    expect(getISOWeeksInYear(date)).toBe(52);
  });
});
