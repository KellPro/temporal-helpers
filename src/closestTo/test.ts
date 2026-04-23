import { describe, it, expect } from "vitest";
import { closestTo } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("closestTo", () => {
  it("returns the closest date", () => {
    const dateToCompare = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const datesArray = [
      ZonedDateTime.from("2024-07-01T10:00:00[Europe/Paris]"),
      ZonedDateTime.from("2024-07-10T10:00:00[Europe/Paris]"),
      ZonedDateTime.from("2024-07-15T10:00:00[Europe/Paris]"),
    ];
    const result = closestTo(dateToCompare, datesArray);
    expect(result?.day).toBe(1);
  });

  it("returns null for empty array", () => {
    const dateToCompare = ZonedDateTime.from("2024-07-05T10:00:00[Europe/Paris]");
    const result = closestTo(dateToCompare, []);
    expect(result).toBeNull();
  });
});
