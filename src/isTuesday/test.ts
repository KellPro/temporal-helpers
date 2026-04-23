import { describe, it, expect } from "vitest";
import { isTuesday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isTuesday", () => {
  const tuesday = ZonedDateTime.from("2024-07-09T12:00:00[Europe/Paris]");

  it("returns true for Tuesday", () => {
    expect(isTuesday(tuesday)).toBe(true);
  });
});
