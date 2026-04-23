import { describe, it, expect } from "vitest";
import { subHours } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subHours", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts hours", () => {
    const result = subHours(date, 5);
    expect(result.hour).toBe(7);
  });
});
