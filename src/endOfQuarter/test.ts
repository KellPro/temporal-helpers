import { describe, it, expect } from "vitest";
import { endOfQuarter } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfQuarter", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of quarter", () => {
    const result = endOfQuarter(date);
    expect(result.month).toBe(9);
  });
});
