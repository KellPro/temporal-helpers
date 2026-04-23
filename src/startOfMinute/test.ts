import { describe, it, expect } from "vitest";
import { startOfMinute } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("startOfMinute", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns start of minute", () => {
    const result = startOfMinute(date);
    expect(result.second).toBe(0);
  });
});
