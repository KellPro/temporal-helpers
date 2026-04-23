import { describe, it, expect } from "vitest";
import { subWeeks } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subWeeks", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts weeks", () => {
    const result = subWeeks(date, 1);
    expect(result.day).toBe(3);
  });
});
