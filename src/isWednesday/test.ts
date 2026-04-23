import { describe, it, expect } from "vitest";
import { isWednesday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isWednesday", () => {
  const wednesday = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns true for Wednesday", () => {
    expect(isWednesday(wednesday)).toBe(true);
  });
});
