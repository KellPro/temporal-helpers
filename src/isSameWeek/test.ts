import { describe, it, expect } from "vitest";
import { isSameWeek } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameWeek", () => {
  const monday = ZonedDateTime.from("2024-07-08T12:00:00[UTC]");
  const sunday = ZonedDateTime.from("2024-07-14T12:00:00[UTC]");

  it("returns false for dates in different weeks when week starts on Sunday", () => {
    expect(isSameWeek(monday, sunday)).toBe(false);
  });

  it("returns true for dates in same week when week starts on Monday", () => {
    const monday2 = ZonedDateTime.from("2024-07-08T12:00:00[UTC]");
    const wednesday = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
    expect(isSameWeek(monday2, wednesday)).toBe(true);
  });
});
