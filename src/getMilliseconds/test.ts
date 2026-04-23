import { describe, it, expect } from "vitest";
import { getMilliseconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getMilliseconds", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns milliseconds", () => {
    expect(getMilliseconds(date)).toBe(123);
  });
});
