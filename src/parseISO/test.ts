import { describe, it, expect } from "vitest";
import { parseISO } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("parseISO", () => {
  it("parses ISO string", () => {
    const result = parseISO("2024-07-10T12:00:00[Europe/Paris]");
    expect(result.year).toBe(2024);
    expect(result.month).toBe(7);
    expect(result.day).toBe(10);
  });
});
