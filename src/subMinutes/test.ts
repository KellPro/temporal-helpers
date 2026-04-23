import { describe, it, expect } from "vitest";
import { subMinutes } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subMinutes", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts minutes", () => {
    const result = subMinutes(date, 30);
    expect(result.minute).toBe(30);
  });
});
