import { describe, it, expect } from "vitest";
import { getUnixTime } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getUnixTime", () => {
  it("returns unix timestamp in seconds", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45.123[UTC]");
    const result = getUnixTime(date);
    expect(result).toBe(Math.floor(date.epochMilliseconds / 1000));
  });
});
