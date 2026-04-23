import { describe, it, expect } from "vitest";
import { subQuarters } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subQuarters", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts quarters", () => {
    const result = subQuarters(date, 1);
    expect(result.month).toBe(4);
  });
});
