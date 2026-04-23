import { describe, it, expect } from "vitest";
import { endOfSecond } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfSecond", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of second", () => {
    const result = endOfSecond(date);
    expect(result.nanosecond).toBe(999);
  });
});
