import { describe, it, expect } from "vitest";
import { startOfSecond } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfSecond", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of second", () => {
    const result = startOfSecond(date);
    expect(result.nanosecond).toBe(0);
  });
});
