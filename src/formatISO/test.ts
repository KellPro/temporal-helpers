import { describe, it, expect } from "vitest";
import { formatISO } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatISO", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("formats date as ISO string with offset", () => {
    expect(formatISO(date)).toBe("2024-07-10T14:30:45+02:00");
  });

  it("supports basic format", () => {
    expect(formatISO(date, { format: "basic" })).toBe("20240710T143045+02:00");
  });

  it("supports fractional second digits", () => {
    expect(formatISO(date, { fractionalSecondDigits: 3 })).toBe(
      "2024-07-10T14:30:45.123+02:00",
    );
  });

  it("uses Z for UTC offset", () => {
    const utc = ZonedDateTime.from("2024-07-10T12:00:00[UTC]");
    expect(formatISO(utc)).toBe("2024-07-10T12:00:00Z");
  });

  it("formats other zones with their offset", () => {
    const chicago = ZonedDateTime.from("2024-07-10T07:00:00[America/Chicago]");
    expect(formatISO(chicago)).toBe("2024-07-10T07:00:00-05:00");
  });
});
