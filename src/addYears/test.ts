import { describe, it, expect } from "vitest";
import { addYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addYears", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds years", () => {
    const result = addYears(date, 1);
    expect(result.year).toBe(2025);
  });
});
