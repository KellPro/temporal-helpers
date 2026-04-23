import { describe, it, expect } from "vitest";
import { endOfMinute } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("endOfMinute", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns end of minute", () => {
    const result = endOfMinute(date);
    expect(result.second).toBe(59);
  });
});
