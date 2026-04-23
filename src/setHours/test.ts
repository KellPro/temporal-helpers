import { describe, it, expect } from "vitest";
import { setHours } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("setHours", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("sets hours", () => {
    const result = setHours(date, 20);
    expect(result.hour).toBe(20);
  });
});
