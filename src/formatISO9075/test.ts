import { describe, it, expect } from "vitest";
import { formatISO9075 } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatISO9075", () => {
  const date = ZonedDateTime.from("2019-09-18T19:00:52[UTC]");

  it("formats complete extended", () => {
    expect(formatISO9075(date)).toBe("2019-09-18 19:00:52");
  });

  it("formats basic", () => {
    expect(formatISO9075(date, { format: "basic" })).toBe("20190918 190052");
  });

  it("formats date only", () => {
    expect(formatISO9075(date, { representation: "date" })).toBe("2019-09-18");
  });

  it("formats time only", () => {
    expect(formatISO9075(date, { representation: "time" })).toBe("19:00:52");
  });
});
