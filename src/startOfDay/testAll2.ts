import { describe, it, expect } from "vitest";
import { startOfDay } from "../startOfDay/index.js";
import { endOfDay } from "../endOfDay/index.js";
import { startOfMonth } from "../startOfMonth/index.js";
import { endOfMonth } from "../endOfMonth/index.js";
import { startOfYear } from "../startOfYear/index.js";
import { endOfYear } from "../endOfYear/index.js";
import { startOfWeek } from "../startOfWeek/index.js";
import { endOfWeek } from "../endOfWeek/index.js";
import { startOfHour } from "../startOfHour/index.js";
import { endOfHour } from "../endOfHour/index.js";
import { startOfMinute } from "../startOfMinute/index.js";
import { endOfMinute } from "../endOfMinute/index.js";
import { startOfSecond } from "../startOfSecond/index.js";
import { endOfSecond } from "../endOfSecond/index.js";
import { startOfQuarter } from "../startOfQuarter/index.js";
import { endOfQuarter } from "../endOfQuarter/index.js";
import { startOfISOWeek } from "../startOfISOWeek/index.js";
import { endOfISOWeek } from "../endOfISOWeek/index.js";
import { startOfDecade } from "../startOfDecade/index.js";
import { endOfDecade } from "../endOfDecade/index.js";
import { startOfToday } from "../startOfToday/index.js";
import { endOfToday } from "../endOfToday/index.js";
import { startOfTomorrow } from "../startOfTomorrow/index.js";
import { endOfTomorrow } from "../endOfTomorrow/index.js";
import { startOfYesterday } from "../startOfYesterday/index.js";
import { endOfYesterday } from "../endOfYesterday/index.js";
import { startOfISOWeekYear } from "../startOfISOWeekYear/index.js";
import { endOfISOWeekYear } from "../endOfISOWeekYear/index.js";
import { startOfWeekYear } from "../startOfWeekYear/index.js";
import { endOfWeekYear } from "../endOfWeekYear/index.js";
import { lastDayOfMonth } from "../lastDayOfMonth/index.js";
import { lastDayOfYear } from "../lastDayOfYear/index.js";
import { lastDayOfWeek } from "../lastDayOfWeek/index.js";
import { lastDayOfQuarter } from "../lastDayOfQuarter/index.js";
import { lastDayOfDecade } from "../lastDayOfDecade/index.js";
import { lastDayOfISOWeek } from "../lastDayOfISOWeek/index.js";
import { lastDayOfISOWeekYear } from "../lastDayOfISOWeekYear/index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("StartOf/EndOf Functions", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");

  describe("startOfDay", () => {
    it("returns start of day", () => {
      const result = startOfDay(date);
      expect(result.hour).toBe(0);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });
  });

  describe("endOfDay", () => {
    it("returns end of day", () => {
      const result = endOfDay(date);
      expect(result.hour).toBe(23);
      expect(result.minute).toBe(59);
      expect(result.second).toBe(59);
    });
  });

  describe("startOfMonth", () => {
    it("returns start of month", () => {
      const result = startOfMonth(date);
      expect(result.month).toBe(7);
      expect(result.day).toBe(1);
    });
  });

  describe("endOfMonth", () => {
    it("returns end of month", () => {
      const result = endOfMonth(date);
      expect(result.month).toBe(7);
      expect(result.day).toBe(31);
    });
  });

  describe("startOfYear", () => {
    it("returns start of year", () => {
      const result = startOfYear(date);
      expect(result.year).toBe(2024);
      expect(result.month).toBe(1);
      expect(result.day).toBe(1);
    });
  });

  describe("endOfYear", () => {
    it("returns end of year", () => {
      const result = endOfYear(date);
      expect(result.year).toBe(2024);
      expect(result.month).toBe(12);
      expect(result.day).toBe(31);
    });
  });

  describe("startOfWeek", () => {
    it("returns start of week", () => {
      const result = startOfWeek(date);
      expect(result.day).toBe(8); // Monday of that week
    });
  });

  describe("endOfWeek", () => {
    it("returns end of week", () => {
      const result = endOfWeek(date);
      expect(result.day).toBe(14); // Sunday of that week
    });
  });

  describe("startOfHour", () => {
    it("returns start of hour", () => {
      const result = startOfHour(date);
      expect(result.minute).toBe(0);
      expect(result.second).toBe(0);
    });
  });

  describe("endOfHour", () => {
    it("returns end of hour", () => {
      const result = endOfHour(date);
      expect(result.minute).toBe(59);
      expect(result.second).toBe(59);
    });
  });

  describe("startOfMinute", () => {
    it("returns start of minute", () => {
      const result = startOfMinute(date);
      expect(result.second).toBe(0);
    });
  });

  describe("endOfMinute", () => {
    it("returns end of minute", () => {
      const result = endOfMinute(date);
      expect(result.second).toBe(59);
    });
  });

  describe("startOfSecond", () => {
    it("returns start of second", () => {
      const result = startOfSecond(date);
      expect(result.millisecond).toBe(0);
    });
  });

  describe("endOfSecond", () => {
    it("returns end of second", () => {
      const result = endOfSecond(date);
      expect(result.millisecond).toBe(999);
    });
  });

  describe("startOfQuarter", () => {
    it("returns start of quarter", () => {
      const result = startOfQuarter(date);
      expect(result.month).toBe(7);
      expect(result.day).toBe(1);
    });
  });

  describe("endOfQuarter", () => {
    it("returns end of quarter", () => {
      const result = endOfQuarter(date);
      expect(result.month).toBe(9);
      expect(result.day).toBe(30);
    });
  });

  describe("startOfISOWeek", () => {
    it("returns start of ISO week", () => {
      const result = startOfISOWeek(date);
      expect(result.day).toBe(8);
    });
  });

  describe("endOfISOWeek", () => {
    it("returns end of ISO week", () => {
      const result = endOfISOWeek(date);
      expect(result.day).toBe(14);
    });
  });

  describe("startOfDecade", () => {
    it("returns start of decade", () => {
      const result = startOfDecade(date);
      expect(result.year).toBe(2020);
      expect(result.month).toBe(1);
      expect(result.day).toBe(1);
    });
  });

  describe("endOfDecade", () => {
    it("returns end of decade", () => {
      const result = endOfDecade(date);
      expect(result.year).toBe(2029);
      expect(result.month).toBe(12);
      expect(result.day).toBe(31);
    });
  });

  describe("startOfToday", () => {
    it("returns start of today", () => {
      const result = startOfToday();
      expect(result.hour).toBe(0);
      expect(result.minute).toBe(0);
    });
  });

  describe("endOfToday", () => {
    it("returns end of today", () => {
      const result = endOfToday();
      expect(result.hour).toBe(23);
      expect(result.minute).toBe(59);
    });
  });

  describe("startOfTomorrow", () => {
    it("returns start of tomorrow", () => {
      const result = startOfTomorrow();
      expect(result.hour).toBe(0);
    });
  });

  describe("endOfTomorrow", () => {
    it("returns end of tomorrow", () => {
      const result = endOfTomorrow();
      expect(result.hour).toBe(23);
    });
  });

  describe("startOfYesterday", () => {
    it("returns start of yesterday", () => {
      const result = startOfYesterday();
      expect(result.hour).toBe(0);
    });
  });

  describe("endOfYesterday", () => {
    it("returns end of yesterday", () => {
      const result = endOfYesterday();
      expect(result.hour).toBe(23);
    });
  });

  describe("startOfISOWeekYear", () => {
    it("returns start of ISO week year", () => {
      const result = startOfISOWeekYear(date);
      expect(result.year).toBe(2024);
    });
  });

  describe("endOfISOWeekYear", () => {
    it("returns end of ISO week year", () => {
      const result = endOfISOWeekYear(date);
      expect(result.year).toBe(2024);
    });
  });

  describe("startOfWeekYear", () => {
    it("returns start of week year", () => {
      const result = startOfWeekYear(date);
      expect(result.year).toBe(2024);
    });
  });

  describe("endOfWeekYear", () => {
    it("returns end of week year", () => {
      const result = endOfWeekYear(date);
      expect(result.year).toBe(2024);
    });
  });

  describe("lastDayOfMonth", () => {
    it("returns last day of month", () => {
      const result = lastDayOfMonth(date);
      expect(result.day).toBe(31);
    });
  });

  describe("lastDayOfYear", () => {
    it("returns last day of year", () => {
      const result = lastDayOfYear(date);
      expect(result.month).toBe(12);
      expect(result.day).toBe(31);
    });
  });

  describe("lastDayOfWeek", () => {
    it("returns last day of week", () => {
      const result = lastDayOfWeek(date);
      expect(result.day).toBe(14);
    });
  });

  describe("lastDayOfQuarter", () => {
    it("returns last day of quarter", () => {
      const result = lastDayOfQuarter(date);
      expect(result.month).toBe(9);
      expect(result.day).toBe(30);
    });
  });

  describe("lastDayOfDecade", () => {
    it("returns last day of decade", () => {
      const result = lastDayOfDecade(date);
      expect(result.year).toBe(2029);
    });
  });

  describe("lastDayOfISOWeek", () => {
    it("returns last day of ISO week", () => {
      const result = lastDayOfISOWeek(date);
      expect(result.day).toBe(14);
    });
  });

  describe("lastDayOfISOWeekYear", () => {
    it("returns last day of ISO week year", () => {
      const result = lastDayOfISOWeekYear(date);
      expect(result.year).toBe(2024);
    });
  });
});
