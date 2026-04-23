import { describe, it, expect } from "vitest";
import { isThisHour } from "../isThisHour/index.js";
import { isThisMinute } from "../isThisMinute/index.js";
import { isThisSecond } from "../isThisSecond/index.js";
import { isThisWeek } from "../isThisWeek/index.js";
import { isThisMonth } from "../isThisMonth/index.js";
import { isThisQuarter } from "../isThisQuarter/index.js";
import { isThisYear } from "../isThisYear/index.js";
import { isThisISOWeek } from "../isThisISOWeek/index.js";
import { isSame } from "../isSame/index.js";
import { compareAsc } from "../compareAsc/index.js";
import { compareDesc } from "../compareDesc/index.js";
import { min } from "../min/index.js";
import { max } from "../max/index.js";
import { clamp } from "../clamp/index.js";
import { closestIndexTo } from "../closestIndexTo/index.js";
import { closestTo } from "../closestTo/index.js";
import { isValid } from "../isValid/index.js";
import { isFirstDayOfMonth } from "../isFirstDayOfMonth/index.js";
import { isLastDayOfMonth } from "../isLastDayOfMonth/index.js";
import { isMonday } from "../isMonday/index.js";
import { isTuesday } from "../isTuesday/index.js";
import { isWednesday } from "../isWednesday/index.js";
import { isThursday } from "../isThursday/index.js";
import { isFriday } from "../isFriday/index.js";
import { isSaturday } from "../isSaturday/index.js";
import { isSunday } from "../isSunday/index.js";
import { isWeekend } from "../isWeekend/index.js";
import { isLeapYear } from "../isLeapYear/index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("Comparison and Is Functions", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");
  const saturday = ZonedDateTime.from("2024-07-06T12:00:00[Europe/Paris]");
  const sunday = ZonedDateTime.from("2024-07-07T12:00:00[Europe/Paris]");
  const monday = ZonedDateTime.from("2024-07-08T12:00:00[Europe/Paris]");
  const firstDay = ZonedDateTime.from("2024-07-01T12:00:00[Europe/Paris]");
  const lastDay = ZonedDateTime.from("2024-07-31T12:00:00[Europe/Paris]");
  const leapYear = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const nonLeapYear = ZonedDateTime.from("2023-07-10T12:00:00[Europe/Paris]");

  describe("isThisHour", () => {
    it("returns true for current hour", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisHour(now)).toBe(true);
    });
    it("returns false for different hour", () => {
      expect(isThisHour(date)).toBe(false);
    });
  });

  describe("isThisMinute", () => {
    it("returns true for current minute", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisMinute(now)).toBe(true);
    });
    it("returns false for different minute", () => {
      expect(isThisMinute(date)).toBe(false);
    });
  });

  describe("isThisSecond", () => {
    it("returns true for current second", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisSecond(now)).toBe(true);
    });
    it("returns false for different second", () => {
      expect(isThisSecond(date)).toBe(false);
    });
  });

  describe("isThisWeek", () => {
    it("returns true for current week", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisWeek(now)).toBe(true);
    });
    it("returns false for different week", () => {
      expect(isThisWeek(date)).toBe(false);
    });
  });

  describe("isThisMonth", () => {
    it("returns true for current month", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisMonth(now)).toBe(true);
    });
    it("returns false for different month", () => {
      expect(isThisMonth(date)).toBe(false);
    });
  });

  describe("isThisQuarter", () => {
    it("returns true for current quarter", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisQuarter(now)).toBe(true);
    });
    it("returns false for different quarter", () => {
      expect(isThisQuarter(date)).toBe(false);
    });
  });

  describe("isThisYear", () => {
    it("returns true for current year", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisYear(now)).toBe(true);
    });
    it("returns false for different year", () => {
      expect(isThisYear(date)).toBe(false);
    });
  });

  describe("isThisISOWeek", () => {
    it("returns true for current ISO week", () => {
      const now = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isThisISOWeek(now)).toBe(true);
    });
    it("returns false for different ISO week", () => {
      expect(isThisISOWeek(date)).toBe(false);
    });
  });

  describe("isSame", () => {
    it("returns true for same date with unit", () => {
      const same = ZonedDateTime.from("2024-07-10T16:00:00[Europe/Paris]");
      expect(isSame(date, same, "day")).toBe(true);
    });
    it("returns false for different date", () => {
      const diff = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");
      expect(isSame(date, diff, "day")).toBe(false);
    });
  });

  describe("isMonday", () => {
    it("returns true for Monday", () => {
      expect(isMonday(monday)).toBe(true);
    });
    it("returns false for non-Monday", () => {
      expect(isMonday(date)).toBe(false);
    });
  });

  describe("isTuesday", () => {
    it("returns true for Tuesday", () => {
      const tuesday = ZonedDateTime.from("2024-07-09T12:00:00[Europe/Paris]");
      expect(isTuesday(tuesday)).toBe(true);
    });
    it("returns false for non-Tuesday", () => {
      expect(isTuesday(date)).toBe(false);
    });
  });

  describe("isWednesday", () => {
    it("returns true for Wednesday", () => {
      expect(isWednesday(date)).toBe(true);
    });
    it("returns false for non-Wednesday", () => {
      expect(isWednesday(monday)).toBe(false);
    });
  });

  describe("isThursday", () => {
    it("returns true for Thursday", () => {
      const thursday = ZonedDateTime.from("2024-07-11T12:00:00[Europe/Paris]");
      expect(isThursday(thursday)).toBe(true);
    });
    it("returns false for non-Thursday", () => {
      expect(isThursday(date)).toBe(false);
    });
  });

  describe("isFriday", () => {
    it("returns true for Friday", () => {
      const friday = ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]");
      expect(isFriday(friday)).toBe(true);
    });
    it("returns false for non-Friday", () => {
      expect(isFriday(date)).toBe(false);
    });
  });

  describe("isSaturday", () => {
    it("returns true for Saturday", () => {
      expect(isSaturday(saturday)).toBe(true);
    });
    it("returns false for non-Saturday", () => {
      expect(isSaturday(date)).toBe(false);
    });
  });

  describe("isSunday", () => {
    it("returns true for Sunday", () => {
      expect(isSunday(sunday)).toBe(true);
    });
    it("returns false for non-Sunday", () => {
      expect(isSunday(date)).toBe(false);
    });
  });

  describe("isWeekend", () => {
    it("returns true for Saturday", () => {
      expect(isWeekend(saturday)).toBe(true);
    });
    it("returns true for Sunday", () => {
      expect(isWeekend(sunday)).toBe(true);
    });
    it("returns false for weekday", () => {
      expect(isWeekend(date)).toBe(false);
    });
  });

  describe("isLeapYear", () => {
    it("returns true for leap year", () => {
      expect(isLeapYear(leapYear)).toBe(true);
    });
    it("returns false for non-leap year", () => {
      expect(isLeapYear(nonLeapYear)).toBe(false);
    });
  });

  describe("isFirstDayOfMonth", () => {
    it("returns true for first day", () => {
      expect(isFirstDayOfMonth(firstDay)).toBe(true);
    });
    it("returns false for non-first day", () => {
      expect(isFirstDayOfMonth(date)).toBe(false);
    });
  });

  describe("isLastDayOfMonth", () => {
    it("returns true for last day", () => {
      expect(isLastDayOfMonth(lastDay)).toBe(true);
    });
    it("returns false for non-last day", () => {
      expect(isLastDayOfMonth(date)).toBe(false);
    });
  });

  describe("isValid", () => {
    it("returns true for valid date", () => {
      expect(isValid(date)).toBe(true);
    });
    it("returns false for invalid date", () => {
      expect(isValid(new Date("invalid"))).toBe(false);
    });
  });
});
