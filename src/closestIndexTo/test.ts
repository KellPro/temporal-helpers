import { describe, it, expect } from "vitest";
import { closestIndexTo } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("closestIndexTo", () => {
  it("returns the index of the closest date", () => {
    const dateToCompare = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const datesArray = [
      ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
      ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]"),
    ];
    const result = closestIndexTo(dateToCompare, datesArray);
    expect(result).toBe(0);
  });

  it("returns null for empty array", () => {
    const dateToCompare = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const result = closestIndexTo(dateToCompare, []);
    expect(result).toBeNull();
  });

  it("returns 0 for single element array", () => {
    const dateToCompare = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const datesArray = [ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]")];
    const result = closestIndexTo(dateToCompare, datesArray);
    expect(result).toBe(0);
  });
});
