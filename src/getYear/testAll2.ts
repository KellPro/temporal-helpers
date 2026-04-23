import { describe, it, expect } from "vitest";
import { getYear } from "../getYear/index.js";
import { getMonth } from "../getMonth/index.js";
import { getDate } from "../getDate/index.js";
import { getDay } from "../getDay/index.js";
import { getHours } from "../getHours/index.js";
import { getMinutes } from "../getMinutes/index.js";
import { getSeconds } from "../getSeconds/index.js";
import { getMilliseconds } from "../getMilliseconds/index.js";
import { getQuarter } from "../getQuarter/index.js";
import { getDayOfYear } from "../getDayOfYear/index.js";
import { getDaysInMonth } from "../getDaysInMonth/index.js";
import { getDaysInYear } from "../getDaysInYear/index.js";
import { getISOWeek } from "../getISOWeek/index.js";
import { getISOWeekYear } from "../getISOWeekYear/index.js";
import { getISOWeeksInYear } from "../getISOWeeksInYear/index.js";
import { getISODay } from "../getISODay/index.js";
import { getDecade } from "../getDecade/index.js";
import { getTime } from "../getTime/index.js";
import { getUnixTime } from "../getUnixTime/index.js";
import { getWeek } from "../getWeek/index.js";
import { getWeekYear } from "../getWeekYear/index.js";
import { getWeekOfMonth } from "../getWeekOfMonth/index.js";
import { getWeeksInMonth } from "../getWeeksInMonth/index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("Getter Functions", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");
  const leapDate = ZonedDateTime.from("2024-02-15T12:00:00[Europe/Paris]");
  const nonLeapDate = ZonedDateTime.from("2023-02-15T12:00:00[Europe/Paris]");

  describe("getYear", () => {
    it("returns year", () => {
      expect(getYear(date)).toBe(2024);
    });
  });

  describe("getMonth", () => {
    it("returns month", () => {
      expect(getMonth(date)).toBe(7);
    });
  });

  describe("getDate", () => {
    it("returns date", () => {
      expect(getDate(date)).toBe(10);
    });
  });

  describe("getDay", () => {
    it("returns day of week", () => {
      expect(getDay(date)).toBe(3); // Wednesday
    });
  });

  describe("getHours", () => {
    it("returns hours", () => {
      expect(getHours(date)).toBe(14);
    });
  });

  describe("getMinutes", () => {
    it("returns minutes", () => {
      expect(getMinutes(date)).toBe(30);
    });
  });

  describe("getSeconds", () => {
    it("returns seconds", () => {
      expect(getSeconds(date)).toBe(45);
    });
  });

  describe("getMilliseconds", () => {
    it("returns milliseconds", () => {
      expect(getMilliseconds(date)).toBe(123);
    });
  });

  describe("getQuarter", () => {
    it("returns quarter", () => {
      expect(getQuarter(date)).toBe(3);
    });
    it("returns quarter 1 for Jan-Mar", () => {
      const q1 = ZonedDateTime.from("2024-02-10T12:00:00[Europe/Paris]");
      expect(getQuarter(q1)).toBe(1);
    });
    it("returns quarter 4 for Oct-Dec", () => {
      const q4 = ZonedDateTime.from("2024-11-10T12:00:00[Europe/Paris]");
      expect(getQuarter(q4)).toBe(4);
    });
  });

  describe("getDayOfYear", () => {
    it("returns day of year", () => {
      expect(getDayOfYear(date)).toBe(192);
    });
  });

  describe("getDaysInMonth", () => {
    it("returns days in month", () => {
      expect(getDaysInMonth(date)).toBe(31);
    });
    it("returns days in February for leap year", () => {
      expect(getDaysInMonth(leapDate)).toBe(29);
    });
    it("returns days in February for non-leap year", () => {
      expect(getDaysInMonth(nonLeapDate)).toBe(28);
    });
  });

  describe("getDaysInYear", () => {
    it("returns days in leap year", () => {
      expect(getDaysInYear(leapDate)).toBe(366);
    });
    it("returns days in non-leap year", () => {
      expect(getDaysInYear(nonLeapDate)).toBe(365);
    });
  });

  describe("getISOWeek", () => {
    it("returns ISO week", () => {
      expect(getISOWeek(date)).toBe(28);
    });
  });

  describe("getISOWeekYear", () => {
    it("returns ISO week year", () => {
      expect(getISOWeekYear(date)).toBe(2024);
    });
  });

  describe("getISOWeeksInYear", () => {
    it("returns ISO weeks in year", () => {
      expect(getISOWeeksInYear(date)).toBe(52);
    });
  });

  describe("getISODay", () => {
    it("returns ISO day", () => {
      expect(getISODay(date)).toBe(3); // Wednesday
    });
  });

  describe("getDecade", () => {
    it("returns decade", () => {
      expect(getDecade(date)).toBe(202);
    });
  });

  describe("getTime", () => {
    it("returns time in milliseconds", () => {
      const result = getTime(date);
      expect(typeof result).toBe("number");
      expect(result).toBeGreaterThan(0);
    });
  });

  describe("getUnixTime", () => {
    it("returns unix time", () => {
      const result = getUnixTime(date);
      expect(typeof result).toBe("number");
    });
  });

  describe("getWeek", () => {
    it("returns week", () => {
      const result = getWeek(date);
      expect(typeof result).toBe("number");
    });
  });

  describe("getWeekYear", () => {
    it("returns week year", () => {
      expect(getWeekYear(date)).toBe(2024);
    });
  });

  describe("getWeekOfMonth", () => {
    it("returns week of month", () => {
      const result = getWeekOfMonth(date);
      expect(typeof result).toBe("number");
    });
  });

  describe("getWeeksInMonth", () => {
    it("returns weeks in month", () => {
      const result = getWeeksInMonth(date);
      expect(typeof result).toBe("number");
    });
  });
});
