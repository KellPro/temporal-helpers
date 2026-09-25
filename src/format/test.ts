import { describe, it, expect } from "vitest";
import { format } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

const chicagoAfternoon = ZonedDateTime.from(
  "2024-09-26T14:05:03.123-05:00[America/Chicago]",
);
const utcEvening = ZonedDateTime.from("2024-09-26T19:05:03.123[UTC]");
const chicagoMidnight = ZonedDateTime.from(
  "2024-09-26T00:00:00-05:00[America/Chicago]",
);
const chicagoNoon = ZonedDateTime.from(
  "2024-09-26T12:00:00-05:00[America/Chicago]",
);

describe("format", () => {
  describe("regressions: single-pass tokenization", () => {
    it("does not re-tokenize substituted text", () => {
      expect(format(chicagoAfternoon, "MMMM")).toBe("September");
      expect(format(chicagoAfternoon, "MMM")).toBe("Sep");
      expect(format(chicagoAfternoon, "MMMM yyyy")).toBe("September 2024");
      expect(format(chicagoAfternoon, "MMMMM do, yyyy")).toBe("S 26th, 2024");
    });

    it("renders quoted literals without treating them as tokens", () => {
      expect(format(chicagoAfternoon, "yyyy-MM-dd'T'HH:mm")).toBe(
        "2024-09-26T14:05",
      );
      expect(format(chicagoAfternoon, "h 'o''clock'")).toBe("2 o'clock");
      expect(format(chicagoAfternoon, "''")).toBe("'");
      expect(format(chicagoAfternoon, "d'd'")).toBe("26d");
      expect(format(chicagoAfternoon, "XXX 'Z'")).toBe("-05:00 Z");
    });

    it("renders day period as AM/PM", () => {
      expect(format(chicagoAfternoon, "a")).toBe("PM");
      expect(format(chicagoAfternoon, "aa")).toBe("PM");
      expect(format(chicagoAfternoon, "aaa")).toBe("PM");
    });
  });

  describe("original suite", () => {
    it("formats date with year", () => {
      const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
      expect(format(date, "yyyy")).toBe("2024");
      expect(format(date, "yy")).toBe("24");
    });

    it("formats date with month", () => {
      const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
      expect(format(date, "MMMM")).toBe("July");
      expect(format(date, "MMM")).toBe("Jul");
      expect(format(date, "MM")).toBe("07");
      expect(format(date, "M")).toBe("7");
    });

    it("formats date with day", () => {
      const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
      expect(format(date, "dd")).toBe("10");
      expect(format(date, "d")).toBe("10");
    });

    it("formats time", () => {
      const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
      expect(format(date, "HH:mm:ss")).toBe("14:30:00");
      // Ported: the original used `hh:mm A`; date-fns has no `A` token, only `a`.
      expect(format(date, "hh:mm a")).toBe("02:30 PM");
    });

    it("formats full date", () => {
      const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
      expect(format(date, "yyyy-MM-dd")).toBe("2024-07-10");
    });

    it("formats ordinal day with do", () => {
      const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
      expect(format(date, "do")).toBe("10th");
      expect(format(date, "MMMM do, yyyy")).toBe("July 10th, 2024");

      const third = Temporal.ZonedDateTime.from("2024-08-03T09:15:00.000-05:00[America/Chicago]");
      expect(format(third, "do")).toBe("3rd");

      const eleventh = Temporal.ZonedDateTime.from("2024-07-11T09:15:00.000-05:00[America/Chicago]");
      expect(format(eleventh, "do")).toBe("11th");

      const thirteenth = Temporal.ZonedDateTime.from("2024-07-13T09:15:00.000-05:00[America/Chicago]");
      expect(format(thirteenth, "do")).toBe("13th");

      const twentySecond = Temporal.ZonedDateTime.from("2024-07-22T09:15:00.000-05:00[America/Chicago]");
      expect(format(twentySecond, "do")).toBe("22nd");
    });

    it("does not re-replace tokens inside rendered text", () => {
      // "August" contains the A and s token characters; a token-by-token pass
      // over the accumulated string corrupts the rendered month.
      const date = Temporal.ZonedDateTime.from("2024-08-03T09:15:00.000-05:00[America/Chicago]");
      expect(format(date, "MMMM")).toBe("August");
      // Ported: en-US day period case corrected (the original asserted "am").
      expect(format(date, "MMMM do, yyyy a")).toBe("August 3rd, 2024 AM");
    });

    it("throws on capital A day period, matching date-fns", () => {
      const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
      expect(() => format(date, "hh:mm A")).toThrow(
        /unescaped latin alphabet character/,
      );
    });
  });

  describe("calendar year (y)", () => {
    it("supports y, yy, yyy, yyyy", () => {
      expect(format(chicagoAfternoon, "y")).toBe("2024");
      expect(format(chicagoAfternoon, "yy")).toBe("24");
      expect(format(chicagoAfternoon, "yyy")).toBe("2024");
      expect(format(chicagoAfternoon, "yyyy")).toBe("2024");
    });

    it("pads yyyy to four digits for short years", () => {
      const date = ZonedDateTime.from({
        year: 44,
        month: 5,
        day: 3,
        timeZone: "UTC",
      });
      expect(format(date, "y")).toBe("44");
      expect(format(date, "yy")).toBe("44");
      expect(format(date, "yyy")).toBe("044");
      expect(format(date, "yyyy")).toBe("0044");
    });
  });

  describe("month (M, L)", () => {
    it("supports M, MM, MMM, MMMM, MMMMM", () => {
      expect(format(chicagoAfternoon, "M")).toBe("9");
      expect(format(chicagoAfternoon, "MM")).toBe("09");
      expect(format(chicagoAfternoon, "MMM")).toBe("Sep");
      expect(format(chicagoAfternoon, "MMMM")).toBe("September");
      expect(format(chicagoAfternoon, "MMMMM")).toBe("S");
    });

    it("treats standalone L like M for en-US", () => {
      expect(format(chicagoAfternoon, "L")).toBe("9");
      expect(format(chicagoAfternoon, "LL")).toBe("09");
      expect(format(chicagoAfternoon, "LLL")).toBe("Sep");
      expect(format(chicagoAfternoon, "LLLL")).toBe("September");
    });
  });

  describe("day of month (d, do)", () => {
    it("supports d and dd", () => {
      expect(format(chicagoAfternoon, "d")).toBe("26");
      expect(format(chicagoAfternoon, "dd")).toBe("26");
    });

    it("renders en-US ordinals for do", () => {
      const expectations: Array<[string, string]> = [
        ["2024-09-01", "1st"],
        ["2024-09-02", "2nd"],
        ["2024-09-03", "3rd"],
        ["2024-09-04", "4th"],
        ["2024-09-11", "11th"],
        ["2024-09-12", "12th"],
        ["2024-09-13", "13th"],
        ["2024-09-21", "21st"],
        ["2024-09-22", "22nd"],
        ["2024-09-23", "23rd"],
      ];
      for (const [isoDate, expected] of expectations) {
        const date = ZonedDateTime.from(`${isoDate}T12:00:00[America/Chicago]`);
        expect(format(date, "do")).toBe(expected);
      }
    });
  });

  describe("weekday (E)", () => {
    it("supports E, EE, EEE, EEEE, EEEEE", () => {
      expect(format(chicagoAfternoon, "E")).toBe("Thu");
      expect(format(chicagoAfternoon, "EE")).toBe("Thu");
      expect(format(chicagoAfternoon, "EEE")).toBe("Thu");
      expect(format(chicagoAfternoon, "EEEE")).toBe("Thursday");
      expect(format(chicagoAfternoon, "EEEEE")).toBe("T");
    });

    it("maps Temporal dayOfWeek 1-7 to Monday through Sunday", () => {
      const monday = ZonedDateTime.from("2024-09-30T12:00:00[America/Chicago]");
      const sunday = ZonedDateTime.from("2024-09-29T12:00:00[America/Chicago]");
      expect(format(monday, "EEEE")).toBe("Monday");
      expect(format(sunday, "EEEE")).toBe("Sunday");
    });
  });

  describe("quarter (Q, q)", () => {
    const expectations: Array<[string, string[]]> = [
      ["2024-01-15", ["1", "01", "Q1", "1st quarter", "1"]],
      ["2024-04-15", ["2", "02", "Q2", "2nd quarter", "2"]],
      ["2024-09-26", ["3", "03", "Q3", "3rd quarter", "3"]],
      ["2024-12-15", ["4", "04", "Q4", "4th quarter", "4"]],
    ];

    it("supports Q, QQ, QQQ, QQQQ, QQQQQ", () => {
      for (const [isoDate, expected] of expectations) {
        const date = ZonedDateTime.from(`${isoDate}T12:00:00[UTC]`);
        expect(format(date, "Q")).toBe(expected[0]);
        expect(format(date, "QQ")).toBe(expected[1]);
        expect(format(date, "QQQ")).toBe(expected[2]);
        expect(format(date, "QQQQ")).toBe(expected[3]);
        expect(format(date, "QQQQQ")).toBe(expected[4]);
      }
    });

    it("treats q like Q for en-US", () => {
      expect(format(chicagoAfternoon, "q")).toBe("3");
      expect(format(chicagoAfternoon, "qqqq")).toBe("3rd quarter");
    });
  });

  describe("clock time (h, H, m, s)", () => {
    it("wraps h to 12 at midnight and noon", () => {
      expect(format(chicagoMidnight, "h")).toBe("12");
      expect(format(chicagoMidnight, "hh")).toBe("12");
      expect(format(chicagoMidnight, "H")).toBe("0");
      expect(format(chicagoMidnight, "HH")).toBe("00");
      expect(format(chicagoMidnight, "a")).toBe("AM");
      expect(format(chicagoNoon, "h")).toBe("12");
      expect(format(chicagoNoon, "a")).toBe("PM");
    });

    it("supports h, hh, H, HH, m, mm, s, ss", () => {
      expect(format(chicagoAfternoon, "h")).toBe("2");
      expect(format(chicagoAfternoon, "hh")).toBe("02");
      expect(format(chicagoAfternoon, "H")).toBe("14");
      expect(format(chicagoAfternoon, "HH")).toBe("14");
      expect(format(chicagoAfternoon, "m")).toBe("5");
      expect(format(chicagoAfternoon, "mm")).toBe("05");
      expect(format(chicagoAfternoon, "s")).toBe("3");
      expect(format(chicagoAfternoon, "ss")).toBe("03");
    });

    it("supports wide and narrow day periods", () => {
      expect(format(chicagoAfternoon, "aaaa")).toBe("p.m.");
      expect(format(chicagoAfternoon, "aaaaa")).toBe("p");
    });
  });

  describe("fractional seconds (S)", () => {
    it("supports S, SS, SSS", () => {
      expect(format(chicagoAfternoon, "S")).toBe("1");
      expect(format(chicagoAfternoon, "SS")).toBe("12");
      expect(format(chicagoAfternoon, "SSS")).toBe("123");
    });

    it("zero-pads fractional digits", () => {
      const date = ZonedDateTime.from(
        "2024-09-26T14:05:03.045-05:00[America/Chicago]",
      );
      expect(format(date, "S")).toBe("0");
      expect(format(date, "SS")).toBe("04");
      expect(format(date, "SSS")).toBe("045");
    });
  });

  describe("local week (w) and week-numbering year (Y)", () => {
    it("supports w and ww", () => {
      expect(format(chicagoAfternoon, "w")).toBe("39");
      expect(format(chicagoAfternoon, "ww")).toBe("39");
      const january = ZonedDateTime.from("2024-01-01T12:00:00[UTC]");
      expect(format(january, "w")).toBe("1");
      expect(format(january, "ww")).toBe("01");
    });

    it("rolls weeks containing next January 1 into the next week year", () => {
      const december = ZonedDateTime.from("2024-12-30T12:00:00[UTC]");
      expect(format(december, "w")).toBe("1");
      expect(format(december, "Y")).toBe("2025");
      expect(format(december, "Yo")).toBe("2025th");
    });

    it("keeps late December in the current week year otherwise", () => {
      const december = ZonedDateTime.from("2022-12-31T12:00:00[UTC]");
      expect(format(december, "w")).toBe("53");
      expect(format(december, "Y")).toBe("2022");
    });
  });

  describe("day of year (o) and the ordinal family", () => {
    it("supports o, oo, ooo", () => {
      expect(format(chicagoAfternoon, "o")).toBe("270th");
      expect(format(chicagoAfternoon, "oo")).toBe("270th");
      expect(format(chicagoAfternoon, "ooo")).toBe("270th");
    });

    it("supports do, Mo, Qo, wo, Yo", () => {
      expect(format(chicagoAfternoon, "do")).toBe("26th");
      expect(format(chicagoAfternoon, "Mo")).toBe("9th");
      expect(format(chicagoAfternoon, "Qo")).toBe("3rd");
      expect(format(chicagoAfternoon, "wo")).toBe("39th");
      expect(format(chicagoAfternoon, "Yo")).toBe("2024th");
    });

    it("treats a lone o after a longer run as day of year, not an ordinal pair", () => {
      expect(format(chicagoAfternoon, "ddo")).toBe("26270th");
      expect(format(chicagoAfternoon, "MMo")).toBe("09270th");
    });
  });

  describe("era (G)", () => {
    it("supports G, GGGG, GGGGG for AD", () => {
      expect(format(chicagoAfternoon, "G")).toBe("AD");
      expect(format(chicagoAfternoon, "GGG")).toBe("AD");
      expect(format(chicagoAfternoon, "GGGG")).toBe("Anno Domini");
      expect(format(chicagoAfternoon, "GGGGG")).toBe("A");
    });

    it("supports BC for non-positive years", () => {
      const date = ZonedDateTime.from({
        year: 0,
        month: 1,
        day: 1,
        timeZone: "UTC",
      });
      expect(format(date, "G")).toBe("BC");
      expect(format(date, "GGGG")).toBe("Before Christ");
      expect(format(date, "GGGGG")).toBe("B");
    });
  });

  describe("epoch timestamps (t, T)", () => {
    it("supports t and T", () => {
      expect(format(chicagoAfternoon, "t")).toBe("1727377503");
      expect(format(chicagoAfternoon, "T")).toBe("1727377503123");
    });

    it("floors epoch seconds before 1970", () => {
      const date = ZonedDateTime.from("1969-12-31T23:59:59.999[UTC]");
      expect(format(date, "t")).toBe("-1");
      expect(format(date, "T")).toBe("-1");
      expect(format(date, "S")).toBe("9");
      expect(format(date, "SS")).toBe("99");
      expect(format(date, "SSS")).toBe("999");
    });
  });

  describe("ISO-8601 offsets (X, x)", () => {
    it("supports X, XX, XXX", () => {
      expect(format(chicagoAfternoon, "X")).toBe("-05");
      expect(format(chicagoAfternoon, "XX")).toBe("-0500");
      expect(format(chicagoAfternoon, "XXX")).toBe("-05:00");
    });

    it("emits Z for zero offset with X and +00 forms with x", () => {
      expect(format(utcEvening, "X")).toBe("Z");
      expect(format(utcEvening, "XX")).toBe("Z");
      expect(format(utcEvening, "XXX")).toBe("Z");
      expect(format(utcEvening, "x")).toBe("+00");
      expect(format(utcEvening, "xx")).toBe("+0000");
      expect(format(utcEvening, "xxx")).toBe("+00:00");
    });

    it("includes minutes for non-whole-hour offsets", () => {
      const kolkata = ZonedDateTime.from("2024-09-27T05:30:00[Asia/Kolkata]");
      expect(format(kolkata, "X")).toBe("+0530");
      expect(format(kolkata, "XXX")).toBe("+05:30");
      expect(format(kolkata, "xxx")).toBe("+05:30");
    });
  });

  describe("zone sensitivity", () => {
    it("formats the same instant differently per zone", () => {
      const instant = ZonedDateTime.from("2024-09-27T00:30:00[UTC]");
      const chicagoView = instant.withTimeZone("America/Chicago");
      const kolkataView = instant.withTimeZone("Asia/Kolkata");
      expect(format(instant, "d h a")).toBe("27 12 AM");
      expect(format(chicagoView, "d h a")).toBe("26 7 PM");
      expect(format(kolkataView, "d h a")).toBe("27 6 AM");
    });
  });

  describe("invalid masks", () => {
    it("throws on unescaped letters outside the token alphabet", () => {
      expect(() => format(chicagoAfternoon, "yyyy-Z")).toThrow(
        /unescaped latin alphabet character/,
      );
      expect(() => format(chicagoAfternoon, "V")).toThrow(
        /unescaped latin alphabet character/,
      );
    });

    it("preserves newlines as literal text", () => {
      expect(format(chicagoAfternoon, "yyyy\nMM\ndd")).toBe("2024\n09\n26");
    });

    it("clamps letter runs longer than any token width", () => {
      expect(format(chicagoAfternoon, "MMMMMM")).toBe("S");
      expect(format(chicagoAfternoon, "EEEEEE")).toBe("T");
      expect(format(chicagoAfternoon, "ddddd")).toBe("26");
      expect(format(chicagoAfternoon, "SSSS")).toBe("123");
    });

    it("throws on unterminated quoted literals", () => {
      expect(() => format(chicagoAfternoon, "'oops")).toThrow(/unterminated/);
    });
  });

  describe("composite masks", () => {
    it("formats the production mask", () => {
      expect(format(chicagoAfternoon, "MMMM do, y")).toBe(
        "September 26th, 2024",
      );
    });

    it("formats a full date-time", () => {
      expect(format(chicagoAfternoon, "E, MMM d, yyyy h:mm a")).toBe(
        "Thu, Sep 26, 2024 2:05 PM",
      );
      expect(format(chicagoAfternoon, "HH:mm:ss.SSS")).toBe("14:05:03.123");
    });
  });
});
