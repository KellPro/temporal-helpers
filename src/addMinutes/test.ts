import { describe, it, expect } from "vitest";
import { addMinutes } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addMinutes", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds minutes", () => {
    const result = addMinutes(date, 30);
    expect(result.minute).toBe(30);
  });
});
