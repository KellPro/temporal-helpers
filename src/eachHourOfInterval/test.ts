import { describe, it, expect } from "vitest";
import { eachHourOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachHourOfInterval", () => {
  it("returns hours in interval", () => {
    const start = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
    const end = ZonedDateTime.from("2024-07-10T15:00:00[Europe/Paris]");
    const result = eachHourOfInterval({ start, end });
    expect(result.length).toBe(4);
    expect(result[0].hour).toBe(12);
    expect(result[3].hour).toBe(15);
  });
});
