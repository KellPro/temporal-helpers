import { describe, it, expect } from "vitest";
import { addQuarters } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addQuarters", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds quarters", () => {
    const result = addQuarters(date, 1);
    expect(result.month).toBe(10);
  });
});
