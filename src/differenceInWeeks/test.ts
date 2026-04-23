import { describe, it, expect } from "vitest";
import { differenceInWeeks } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInWeeks", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns weeks between dates", () => {
    expect(differenceInWeeks(date3, date1)).toBe(0);
  });
});
