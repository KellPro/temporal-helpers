import { describe, it, expect } from "vitest";
import { formatRFC7231 } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("formatRFC7231", () => {
  it("formats in UTC GMT", () => {
    const date = ZonedDateTime.from("2019-09-18T19:00:52[UTC]");
    expect(formatRFC7231(date)).toBe("Wed, 18 Sep 2019 19:00:52 GMT");
  });

  it("converts non-UTC zones to UTC", () => {
    const date = ZonedDateTime.from("2019-09-18T21:00:52[Europe/Paris]");
    expect(formatRFC7231(date)).toBe("Wed, 18 Sep 2019 19:00:52 GMT");
  });
});
