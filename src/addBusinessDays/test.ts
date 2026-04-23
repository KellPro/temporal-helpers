import { describe, it, expect } from "vitest";
import { addBusinessDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addBusinessDays", () => {
  it("adds business days", () => {
    const friday = ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]");
    const result = addBusinessDays(friday, 1);
    expect(result.day).toBe(7);
  });
});
