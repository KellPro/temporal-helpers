import { describe, it, expect } from "vitest";
import { subBusinessDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subBusinessDays", () => {
  it("subtracts business days", () => {
    const monday = ZonedDateTime.from("2024-07-08T12:00:00[Europe/Paris]");
    const result = subBusinessDays(monday, 1);
    expect(result.day).toBe(7);
  });
});
