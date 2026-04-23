import { describe, it, expect } from "vitest";
import { differenceInCalendarQuarters } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("differenceInCalendarQuarters", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  it("returns calendar quarters between dates", () => {
    const oct = ZonedDateTime.from("2024-10-10T12:00:00[Europe/Paris]");
    expect(differenceInCalendarQuarters(oct, date1)).toBe(1);
  });
});
