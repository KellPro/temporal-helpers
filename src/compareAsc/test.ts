import { describe, it, expect } from "vitest";
import { compareAsc } from "../index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("compareAsc", () => {
  const date1 = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const date2 = ZonedDateTime.from("2024-07-12T12:00:00[Europe/Paris]");
  const date3 = ZonedDateTime.from("2024-07-08T12:00:00[Europe/Paris]");

  it("returns 0 for equal dates", () => {
    expect(compareAsc(date1, date1)).toBe(0);
  });

  it("returns 1 when first date is later", () => {
    expect(compareAsc(date2, date1)).toBe(1);
  });

  it("returns -1 when first date is earlier", () => {
    expect(compareAsc(date3, date1)).toBe(-1);
  });
});
