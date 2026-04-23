import { describe, it, expect } from "vitest";
import { addMonths } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addMonths", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds months", () => {
    const result = addMonths(date, 2);
    expect(result.month).toBe(9);
  });
});
