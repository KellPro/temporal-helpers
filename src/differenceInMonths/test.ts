import { describe, it, expect } from "vitest";
import { differenceInMonths } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInMonths", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns months between dates", () => {
    const dec = ZonedDateTime.from("2024-12-10T12:00:00[Europe/Paris]");
    expect(differenceInMonths(dec, date1)).toBe(5);
  });
});
