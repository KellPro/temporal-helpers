import { describe, it, expect } from "vitest";
import { startOfDecade } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfDecade", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of decade", () => {
    const result = startOfDecade(date);
    expect(result.year).toBe(2020);
    expect(result.month).toBe(1);
    expect(result.day).toBe(1);
  });
});
