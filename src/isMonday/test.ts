import { describe, it, expect } from "vitest";
import { isMonday } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("isMonday", () => {
  const monday = ZonedDateTime.from("2024-07-08T12:00:00[Europe/Paris]");

  it("returns true for Monday", () => {
    expect(isMonday(monday)).toBe(true);
  });
});
