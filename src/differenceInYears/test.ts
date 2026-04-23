import { describe, it, expect } from "vitest";
import { differenceInYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInYears", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns years between dates", () => {
    const nextYear = ZonedDateTime.from("2025-07-10T12:00:00[Europe/Paris]");
    expect(differenceInYears(nextYear, date1)).toBe(1);
  });
});
