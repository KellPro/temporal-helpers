import { describe, it, expect } from "vitest";
import { eachDayOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachDayOfInterval", () => {
  it("returns days in interval", () => {
    const start = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const end = ZonedDateTime.from("2024-07-14T12:00:00[Europe/Paris]");
    const result = eachDayOfInterval({ start, end });
    expect(result.length).toBe(5);
    expect(result[0].day).toBe(10);
    expect(result[4].day).toBe(14);
  });
});
