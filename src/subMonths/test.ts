import { describe, it, expect } from "vitest";
import { subMonths } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subMonths", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts months", () => {
    const result = subMonths(date, 2);
    expect(result.month).toBe(5);
  });
});
