import { describe, it, expect } from "vitest";
import { previousDay } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("previousDay", () => {
  it("returns previous Monday from Wednesday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday (day 3)
    const result = previousDay(date, 1); // Monday = 1
    expect(result.dayOfWeek).toBe(1);
    expect(result.day).toBe(8);
  });

  it("returns previous Friday from Monday", () => {
    const date = ZonedDateTime.from("2024-01-08T12:00:00[Europe/Paris]"); // Monday (day 1)
    const result = previousDay(date, 5); // Friday = 5
    expect(result.dayOfWeek).toBe(5);
    expect(result.day).toBe(5);
  });

  it("returns same day if already that day of week", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday (day 3)
    const result = previousDay(date, 3); // Wednesday = 3
    expect(result.dayOfWeek).toBe(3);
    expect(result.day).toBe(10);
  });
});
