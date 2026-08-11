import { describe, it, expect } from "vitest";
import { fromUnixTime } from "../index.js";

describe("fromUnixTime", () => {
  it("converts unix time to ZonedDateTime", () => {
    const result = fromUnixTime(0);
    expect(Math.floor(result.epochMilliseconds / 1000)).toBe(0);
  });

  it("handles positive unix time", () => {
    const result = fromUnixTime(1609459200);
    expect(result.year).toBe(2021);
  });
});
