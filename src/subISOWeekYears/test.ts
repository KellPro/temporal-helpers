import { describe, it, expect } from "vitest";
import { subISOWeekYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subISOWeekYears", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts ISO week years", () => {
    const result = subISOWeekYears(date, 1);
    expect(result.year).toBe(2023);
  });
});
