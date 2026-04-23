import { describe, it, expect } from "vitest";
import { setDate } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("setDate", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("sets date", () => {
    const result = setDate(date, 15);
    expect(result.day).toBe(15);
  });
});
