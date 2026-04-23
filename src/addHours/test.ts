import { describe, it, expect } from "vitest";
import { addHours } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addHours", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds hours", () => {
    const result = addHours(date, 5);
    expect(result.hour).toBe(17);
  });
});
