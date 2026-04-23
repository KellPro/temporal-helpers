import { describe, it, expect } from "vitest";
import { nextSaturday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("nextSaturday", () => {
  it("returns next Saturday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday
    const result = nextSaturday(date);
    expect(result.dayOfWeek).toBe(6);
    expect(result.day).toBe(13);
  });

  it("returns same Saturday if already Saturday", () => {
    const date = ZonedDateTime.from("2024-01-13T12:00:00[Europe/Paris]"); // Saturday
    const result = nextSaturday(date);
    expect(result.dayOfWeek).toBe(6);
  });
});
