import { describe, it, expect } from "vitest";
import { min } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("min", () => {
  const dates = [
    ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]"),
    ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]"),
    ZonedDateTime.from("2024-07-15T12:00:00[Europe/Paris]"),
  ];

  it("returns earliest date", () => {
    const result = min(dates);
    expect(result.day).toBe(5);
  });
});
