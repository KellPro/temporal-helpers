import { describe, it, expect } from "vitest";
import { addISOWeekYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addISOWeekYears", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds ISO week years", () => {
    const result = addISOWeekYears(date, 1);
    expect(result.year).toBe(2025);
  });
});
