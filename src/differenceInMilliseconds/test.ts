import { describe, it, expect } from "vitest";
import { differenceInMilliseconds } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInMilliseconds", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date2 = ZonedDateTime.from("2024-07-10T12:01:00[Europe/Paris]");

  it("returns milliseconds between dates", () => {
    expect(differenceInMilliseconds(date2, date1)).toBe(60000);
  });
});
