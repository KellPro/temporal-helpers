import { describe, it, expect } from "vitest";
import { formatISO } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatISO", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("formats date as ISO string", () => {
    const result = formatISO(date);
    expect(result).toContain("2024-07-10");
    expect(result).toContain("14:30:45");
  });

  it("supports basic format", () => {
    const result = formatISO(date, { format: "basic" });
    expect(result).toContain("20240710");
  });

  it("supports fractional second digits", () => {
    const result = formatISO(date, { fractionalSecondDigits: 3 });
    expect(result).toContain(".123");
  });
});
