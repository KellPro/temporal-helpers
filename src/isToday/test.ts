import { describe, it, expect } from "vitest";
import { isToday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isToday", () => {
  it("returns true for today", () => {
    const today = Temporal.Now.zonedDateTimeISO("Europe/Paris");
    expect(isToday(today)).toBe(true);
  });

  it("returns false for other days", () => {
    const other = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    expect(isToday(other)).toBe(false);
  });
});
