import { describe, it, expect } from "vitest";
import { lightFormat } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("lightFormat", () => {
  const date = ZonedDateTime.from("2014-02-11T14:30:45.123[UTC]");

  it("formats yyyy-MM-dd", () => {
    expect(lightFormat(date, "yyyy-MM-dd")).toBe("2014-02-11");
  });

  it("formats time tokens", () => {
    expect(lightFormat(date, "HH:mm:ss")).toBe("14:30:45");
    expect(lightFormat(date, "hh:mm a")).toBe("02:30 PM");
  });

  it("formats fractional seconds", () => {
    expect(lightFormat(date, "SSS")).toBe("123");
  });

  it("supports escaped quotes", () => {
    expect(lightFormat(date, "'year:' yyyy")).toBe("year: 2014");
  });

  it("throws on unescaped latin characters", () => {
    expect(() => lightFormat(date, "yyyy-MM-dd eeee")).toThrow(RangeError);
  });
});
