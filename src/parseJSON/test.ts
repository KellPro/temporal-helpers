import { describe, it, expect } from "vitest";
import { parseJSON } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("parseJSON", () => {
  it("parses ISO date string to ZonedDateTime", () => {
    const result = parseJSON("2024-01-15T12:00:00Z");
    expect(result.year).toBe(2024);
    expect(result.month).toBe(1);
    expect(result.day).toBe(15);
    expect(result.hour).toBe(12);
  });

  it("parses date string with timezone", () => {
    const result = parseJSON("2024-01-15T12:00:00+05:00");
    expect(result.year).toBe(2024);
    expect(result.month).toBe(1);
    expect(result.day).toBe(15);
  });
});
