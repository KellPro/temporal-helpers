import { describe, it, expect } from "vitest";
import { addWeeks } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("addWeeks", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("adds weeks", () => {
    const result = addWeeks(date, 1);
    expect(result.day).toBe(17);
  });
});
