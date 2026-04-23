import { describe, it, expect } from "vitest";
import { subMilliseconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subMilliseconds", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts milliseconds", () => {
    const result = subMilliseconds(date, 1500);
    const diff = date.since(result, { largestUnit: "millisecond" });
    expect(diff.milliseconds).toBe(1500);
  });
});
