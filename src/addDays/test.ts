import { describe, it, expect } from "vitest";
import { addDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addDays", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds days", () => {
    const result = addDays(date, 5);
    expect(result.day).toBe(15);
  });
});
