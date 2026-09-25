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

  it("goes back 7 days when input is on the target weekday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday (day 3)
    const result = previousDay(date, 3); // Wednesday = 3
    expect(result.dayOfWeek).toBe(3);
    expect(result.day).toBe(3);
  });

  it("returns previous day when input is the day before the target", () => {
    const date = ZonedDateTime.from("2024-01-07T12:00:00[Europe/Paris]"); // Sunday (day 7)
    const result = previousDay(date, 6); // Saturday = 6
    expect(result.dayOfWeek).toBe(6);
    expect(result.day).toBe(6);
  });

  it("treats 0 as Sunday per date-fns 0-6 convention", () => {
    const date = ZonedDateTime.from("2024-01-14T12:00:00[Europe/Paris]"); // Sunday (day 7)
    const result = previousDay(date, 0); // Sunday = 0
    expect(result.dayOfWeek).toBe(7);
    expect(result.day).toBe(7);
  });

  it("resolves 0 to Sunday, not Monday, from Friday", () => {
    const date = ZonedDateTime.from("2024-01-12T12:00:00[Europe/Paris]"); // Friday (day 5)
    const result = previousDay(date, 0); // Sunday = 0
    expect(result.dayOfWeek).toBe(7);
    expect(result.day).toBe(7);
  });

  it("keeps the zone for non-UTC inputs", () => {
    const date = ZonedDateTime.from("2024-01-12T12:00:00[America/New_York]"); // Friday (day 5)
    const result = previousDay(date, 0); // Sunday = 0
    expect(result.dayOfWeek).toBe(7);
    expect(result.timeZoneId).toBe("America/New_York");
  });
});
