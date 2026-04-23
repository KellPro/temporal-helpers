import { describe, it, expect } from "vitest";
import { subSeconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("subSeconds", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("subtracts seconds", () => {
    const result = subSeconds(date, 30);
    expect(result.second).toBe(30);
  });
});
