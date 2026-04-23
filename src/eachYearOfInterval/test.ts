import { describe, it, expect } from "vitest";
import { eachYearOfInterval } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("eachYearOfInterval", () => {
  const start = ZonedDateTime.from("2020-01-01T00:00:00[Europe/Paris]");
  const end = ZonedDateTime.from("2023-12-31T23:59:59[Europe/Paris]");

  it("returns years in interval", () => {
    const result = eachYearOfInterval({ start, end });
    expect(result.length).toBe(4);
    expect(result[0].year).toBe(2020);
    expect(result[1].year).toBe(2021);
    expect(result[2].year).toBe(2022);
    expect(result[3].year).toBe(2023);
  });
});
