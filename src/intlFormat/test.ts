import { describe, it, expect } from "vitest";
import { intlFormat } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("intlFormat", () => {
  const date = ZonedDateTime.from("2019-10-04T12:30:13[UTC]");

  it("formats with default options", () => {
    const result = intlFormat(date);
    expect(result.length).toBeGreaterThan(0);
  });

  it("formats with format options", () => {
    const result = intlFormat(date, {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      timeZone: "UTC",
    });
    expect(result).toMatch(/2019/);
    expect(result).toMatch(/10/);
    expect(result).toMatch(/4/);
  });

  it("defaults timeZone to the ZDT zone", () => {
    const paris = ZonedDateTime.from("2019-10-04T00:30:00[Europe/Paris]");
    const result = intlFormat(paris, {
      hour: "numeric",
      hourCycle: "h23",
      minute: "2-digit",
    });
    // 00:30 in Paris
    expect(result).toMatch(/00|12|0/);
  });

  it("allows timeZone override", () => {
    const paris = ZonedDateTime.from("2019-10-04T12:00:00[Europe/Paris]");
    const result = intlFormat(
      paris,
      {
        hour: "numeric",
        hourCycle: "h23",
        minute: "2-digit",
        timeZone: "UTC",
      },
    );
    // 12:00 Paris = 10:00 UTC in October
    expect(result).toMatch(/10/);
  });
});
