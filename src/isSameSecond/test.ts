import { describe, it, expect } from "vitest";
import { isSameSecond } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isSameSecond", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const sameSecond = ZonedDateTime.from("2024-07-10T12:00:00.500[Europe/Paris]");

  it("returns true for same second", () => {
    expect(isSameSecond(date1, sameSecond)).toBe(true);
  });
});
