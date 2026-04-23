import { describe, it, expect } from "vitest";
import { addMilliseconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addMilliseconds", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds milliseconds", () => {
    const result = addMilliseconds(date, 1500);
    const diff = result.since(date, { largestUnit: "millisecond" });
    expect(diff.milliseconds).toBe(1500);
  });
});
