import { describe, it, expect } from "vitest";
import { subDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subDays", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts days", () => {
    const result = subDays(date, 5);
    expect(result.day).toBe(5);
  });
});
