import { describe, it, expect } from "vitest";
import { formatDistanceToNow } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatDistanceToNow", () => {
  it("returns a past suffix for a past date", () => {
    const past = Temporal.Now.zonedDateTimeISO("UTC").subtract({ years: 1 });
    const result = formatDistanceToNow(past, { addSuffix: true });
    expect(result).toMatch(/ago$/);
    expect(result).toMatch(/year/);
  });

  it("returns a future suffix for a future date", () => {
    const future = Temporal.Now.zonedDateTimeISO("UTC").add({ years: 1 });
    const result = formatDistanceToNow(future, { addSuffix: true });
    expect(result).toMatch(/^in /);
    expect(result).toMatch(/year/);
  });

  it("uses the input time zone for now", () => {
    const date = ZonedDateTime.from("2020-01-01T00:00:00[Europe/Paris]");
    expect(() => formatDistanceToNow(date)).not.toThrow();
  });
});
