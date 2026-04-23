import { describe, it, expect } from "vitest";
import { setYear } from "../setYear/index.js";
import { setMonth } from "../setMonth/index.js";
import { setDate } from "../setDate/index.js";
import { setDay } from "../setDay/index.js";
import { setHours } from "../setHours/index.js";
import { setMinutes } from "../setMinutes/index.js";
import { setSeconds } from "../setSeconds/index.js";
import { setMilliseconds } from "../setMilliseconds/index.js";
import { setQuarter } from "../setQuarter/index.js";
import { setDayOfYear } from "../setDayOfYear/index.js";
import { setISOWeek } from "../setISOWeek/index.js";
import { setISOWeekYear } from "../setISOWeekYear/index.js";
import { setISODay } from "../setISODay/index.js";
import { setWeek } from "../setWeek/index.js";
import { setWeekYear } from "../setWeekYear/index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("Setter Functions", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  describe("setYear", () => {
    it("sets year", () => {
      const result = setYear(date, 2025);
      expect(result.year).toBe(2025);
    });
  });

  describe("setMonth", () => {
    it("sets month", () => {
      const result = setMonth(date, 1);
      expect(result.month).toBe(1);
    });
  });

  describe("setDate", () => {
    it("sets date", () => {
      const result = setDate(date, 15);
      expect(result.day).toBe(15);
    });
  });

  describe("setDay", () => {
    it("sets day of week", () => {
      const result = setDay(date, 1);
      expect(typeof result.day).toBe("number");
    });
  });

  describe("setHours", () => {
    it("sets hours", () => {
      const result = setHours(date, 20);
      expect(result.hour).toBe(20);
    });
  });

  describe("setMinutes", () => {
    it("sets minutes", () => {
      const result = setMinutes(date, 45);
      expect(result.minute).toBe(45);
    });
  });

  describe("setSeconds", () => {
    it("sets seconds", () => {
      const result = setSeconds(date, 30);
      expect(result.second).toBe(30);
    });
  });

  describe("setMilliseconds", () => {
    it("sets milliseconds", () => {
      const result = setMilliseconds(date, 500);
      expect(result.millisecond).toBe(500);
    });
  });

  describe("setQuarter", () => {
    it("sets quarter", () => {
      const result = setQuarter(date, 2);
      expect(getQuarter(result)).toBe(2);
    });
  });

  describe("setDayOfYear", () => {
    it("sets day of year", () => {
      const result = setDayOfYear(date, 100);
      expect(typeof result.day).toBe("number");
    });
  });

  describe("setISOWeek", () => {
    it("sets ISO week", () => {
      const result = setISOWeek(date, 25);
      expect(typeof result.day).toBe("number");
    });
  });

  describe("setISOWeekYear", () => {
    it("sets ISO week year", () => {
      const result = setISOWeekYear(date, 2025);
      expect(result.year).toBe(2025);
    });
  });

  describe("setISODay", () => {
    it("sets ISO day", () => {
      const result = setISODay(date, 1);
      expect(typeof result.day).toBe("number");
    });
  });

  describe("setWeek", () => {
    it("sets week", () => {
      const result = setWeek(date, 25);
      expect(typeof result.day).toBe("number");
    });
  });

  describe("setWeekYear", () => {
    it("sets week year", () => {
      const result = setWeekYear(date, 2025);
      expect(result.year).toBe(2025);
    });
  });
});

function getQuarter(date: Temporal.ZonedDateTime): number {
  return Math.ceil(date.month / 3);
}
