import { describe, it, expect } from "vitest";
import { nextMonday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("nextMonday", () => {
  it("returns next Monday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday
    const result = nextMonday(date);
    expect(result.dayOfWeek).toBe(1);
    expect(result.day).toBe(15);
  });

  it("returns same Monday if already Monday", () => {
    const date = ZonedDateTime.from("2024-01-08T12:00:00[Europe/Paris]"); // Monday
    const result = nextMonday(date);
    expect(result.dayOfWeek).toBe(1);
  });
});
