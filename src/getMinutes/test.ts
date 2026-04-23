import { describe, it, expect } from "vitest";
import { getMinutes } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("getMinutes", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  it("returns minutes", () => {
    expect(getMinutes(date)).toBe(30);
  });
});
