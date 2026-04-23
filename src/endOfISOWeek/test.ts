import { describe, it, expect } from "vitest";
import { endOfISOWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfISOWeek", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of ISO week", () => {
    const result = endOfISOWeek(date);
    expect(result.day).toBe(14);
  });
});
