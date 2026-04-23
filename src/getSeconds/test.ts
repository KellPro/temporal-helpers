import { describe, it, expect } from "vitest";
import { getSeconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getSeconds", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns seconds", () => {
    expect(getSeconds(date)).toBe(45);
  });
});
