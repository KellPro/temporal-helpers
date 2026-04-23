import { describe, it, expect } from "vitest";
import { subYears } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subYears", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts years", () => {
    const result = subYears(date, 1);
    expect(result.year).toBe(2023);
  });
});
