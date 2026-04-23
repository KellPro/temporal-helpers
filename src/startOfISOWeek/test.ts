import { describe, it, expect } from "vitest";
import { startOfISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfISOWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of ISO week", () => {
    const result = startOfISOWeek(date);
    expect(result.day).toBe(8);
  });
});
