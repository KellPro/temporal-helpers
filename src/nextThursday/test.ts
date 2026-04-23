import { describe, it, expect } from "vitest";
import { nextThursday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("nextThursday", () => {
  it("returns next Thursday", () => {
    const date = ZonedDateTime.from("2024-01-10T12:00:00[Europe/Paris]"); // Wednesday
    const result = nextThursday(date);
    expect(result.dayOfWeek).toBe(4);
    expect(result.day).toBe(11);
  });

  it("returns same Thursday if already Thursday", () => {
    const date = ZonedDateTime.from("2024-01-11T12:00:00[Europe/Paris]"); // Thursday
    const result = nextThursday(date);
    expect(result.dayOfWeek).toBe(4);
  });
});
