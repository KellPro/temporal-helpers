import { describe, it, expect } from "vitest";
import { differenceInDays } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInDays", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");

  it("returns days between dates", () => {
    expect(differenceInDays(date3, date1)).toBe(2);
  });
});
