import { describe, it, expect } from "vitest";
import { getTime } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getTime", () => {
  it("returns epoch milliseconds", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");
    const result = getTime(date);
    expect(result).toBe(date.epochMilliseconds);
  });
});
