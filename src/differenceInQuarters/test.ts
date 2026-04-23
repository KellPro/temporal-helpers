import { describe, it, expect } from "vitest";
import { differenceInQuarters } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInQuarters", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns quarters between dates", () => {
    const oct = ZonedDateTime.from("2024-10-10T12:00:00[Europe/Paris]");
    expect(differenceInQuarters(oct, date1)).toBe(1);
  });
});
