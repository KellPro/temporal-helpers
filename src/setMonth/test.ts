import { describe, it, expect } from "vitest";
import { setMonth } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("setMonth", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("sets month", () => {
    const result = setMonth(date, 1);
    expect(result.month).toBe(1);
  });
});
