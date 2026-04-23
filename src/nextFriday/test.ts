import { describe, it, expect } from "vitest";
import { nextFriday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("nextFriday", () => {
  it("returns next Friday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday
    const result = nextFriday(date);
    expect(result.dayOfWeek).toBe(5);
    expect(result.day).toBe(12);
  });

  it("returns same Friday if already Friday", () => {
    const date = ZonedDateTime.from("2024-01-12T12:00:00[Europe/Paris]"); // Friday
    const result = nextFriday(date);
    expect(result.dayOfWeek).toBe(5);
  });
});
