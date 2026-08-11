import { describe, it, expect } from "vitest";
import { toLegacyDate } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("toLegacyDate", () => {
  it("returns a Date at the same instant", () => {
    const zdt = ZonedDateTime.from("2019-09-18T19:00:52.123[Europe/Paris]");
    const date = toLegacyDate(zdt);
    expect(date).toBeInstanceOf(Date);
    expect(date.getTime()).toBe(zdt.epochMilliseconds);
  });
});
