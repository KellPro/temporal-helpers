import { describe, it, expect } from "vitest";
import { intervalToDuration } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("intervalToDuration", () => {
  it("returns the duration between two dates", () => {
    const start = ZonedDateTime.from("2024-01-01T00:00:00[UTC]");
    const end = ZonedDateTime.from("2024-12-31T23:59:59[UTC]");
    
    const result = intervalToDuration({ start, end });
    
    expect(result).toBeDefined();
    expect(result.years).toBeUndefined();
  });

  it("returns years when there is a year difference", () => {
    const start = ZonedDateTime.from("2024-01-01T00:00:00[UTC]");
    const end = ZonedDateTime.from("2025-01-01T00:00:00[UTC]");
    
    const result = intervalToDuration({ start, end });
    
    expect(result.years).toBe(1);
  });

  it("returns months when there is a month difference", () => {
    const start = ZonedDateTime.from("2024-01-01T00:00:00[UTC]");
    const end = ZonedDateTime.from("2024-02-01T00:00:00[UTC]");
    
    const result = intervalToDuration({ start, end });
    
    expect(result.months).toBe(1);
  });
});
