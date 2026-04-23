import { describe, it, expect } from "vitest";
import { max } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("max", () => {
  const dates = [
    ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]"),
    ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]"),
    ZonedDateTime.from("2024-07-15T12:00:00[Europe/Paris]"),
  ];

  it("returns latest date", () => {
    const result = max(dates);
    expect(result.day).toBe(15);
  });
});
