import { describe, it, expect } from "vitest";
import { isSameMinute } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameMinute", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const sameMinute = ZonedDateTime.from("2024-07-10T12:00:30[Europe/Paris]");
  const diffMinute = ZonedDateTime.from("2024-07-10T12:02:00[Europe/Paris]");

  it("returns true for same minute", () => {
    expect(isSameMinute(date1, sameMinute)).toBe(true);
  });

  it("returns false for different minute", () => {
    expect(isSameMinute(date1, diffMinute)).toBe(false);
  });
});
