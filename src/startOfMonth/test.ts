import { describe, it, expect } from "vitest";
import { startOfMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfMonth", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of month", () => {
    const result = startOfMonth(date);
    expect(result.month).toBe(7);
    expect(result.day).toBe(1);
  });
});
