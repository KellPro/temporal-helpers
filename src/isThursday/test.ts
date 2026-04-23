import { describe, it, expect } from "vitest";
import { isThursday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isThursday", () => {
  const thursday = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");

  it("returns true for Thursday", () => {
    expect(isThursday(thursday)).toBe(true);
  });
});
