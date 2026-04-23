import { describe, it, expect } from "vitest";
import { getISODay } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getISODay", () => {
  it("returns ISO day of week", () => {
    const monday = ZonedDateTime.from("2024-07-08T14:30:45[Europe/Paris]");
    expect(getISODay(monday)).toBe(1);
  });

  it("returns 7 for Sunday", () => {
    const sunday = ZonedDateTime.from("2024-07-07T14:30:45[Europe/Paris]");
    expect(getISODay(sunday)).toBe(7);
  });
});
