import { describe, it, expect } from "vitest";
import { formatRFC3339 } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatRFC3339", () => {
  it("formats UTC with Z", () => {
    const date = ZonedDateTime.from("2019-09-18T19:00:52[UTC]");
    expect(formatRFC3339(date)).toBe("2019-09-18T19:00:52Z");
  });

  it("supports fraction digits", () => {
    const date = ZonedDateTime.from("2019-09-18T19:00:52.234[UTC]");
    expect(formatRFC3339(date, { fractionDigits: 3 })).toBe(
      "2019-09-18T19:00:52.234Z",
    );
  });

  it("formats non-UTC offset", () => {
    const date = ZonedDateTime.from("2024-07-10T14:30:45[Europe/Paris]");
    expect(formatRFC3339(date)).toBe("2024-07-10T14:30:45+02:00");
  });

  it("supports one fraction digit", () => {
    const date = ZonedDateTime.from("2019-09-18T19:00:52.234[UTC]");
    expect(formatRFC3339(date, { fractionDigits: 1 })).toBe(
      "2019-09-18T19:00:52.2Z",
    );
  });
});
