import { describe, it, expect } from "vitest";
import { addSeconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addSeconds", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds seconds", () => {
    const result = addSeconds(date, 30);
    expect(result.second).toBe(30);
  });

  it("handles minute crossing", () => {
    const result = addSeconds(date, 120);
    expect(result.minute).toBe(2);
  });
});
