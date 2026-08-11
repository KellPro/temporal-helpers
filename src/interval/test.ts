import { describe, it, expect } from "vitest";
import { interval } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("interval", () => {
  const start = ZonedDateTime.from("2024-01-01T00:00:00[UTC]");
  const end = ZonedDateTime.from("2024-01-02T00:00:00[UTC]");

  it("returns start and end", () => {
    expect(interval(start, end)).toEqual({ start, end });
  });

  it("allows equal endpoints", () => {
    expect(interval(start, start)).toEqual({ start, end: start });
  });

  it("throws when start is after end", () => {
    expect(() => interval(end, start)).toThrow(RangeError);
  });
});
