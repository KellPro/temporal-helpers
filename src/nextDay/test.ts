import { describe, it, expect } from "vitest";
import { nextDay } from "../nextDay/index.js";
import { nextMonday } from "../nextMonday/index.js";
import { nextTuesday } from "../nextTuesday/index.js";
import { nextWednesday } from "../nextWednesday/index.js";
import { nextThursday } from "../nextThursday/index.js";
import { nextFriday } from "../nextFriday/index.js";
import { nextSaturday } from "../nextSaturday/index.js";
import { nextSunday } from "../nextSunday/index.js";
import { previousDay } from "../previousDay/index.js";
import { previousMonday } from "../previousMonday/index.js";
import { previousTuesday } from "../previousTuesday/index.js";
import { previousWednesday } from "../previousWednesday/index.js";
import { previousThursday } from "../previousThursday/index.js";
import { previousFriday } from "../previousFriday/index.js";
import { previousSaturday } from "../previousSaturday/index.js";
import { previousSunday } from "../previousSunday/index.js";
import { isFuture } from "../isFuture/index.js";
import { isPast } from "../isPast/index.js";
import { isToday } from "../isToday/index.js";
import { isTomorrow } from "../isTomorrow/index.js";
import { isYesterday } from "../isYesterday/index.js";
import { isWithinInterval } from "../isWithinInterval/index.js";
import { areIntervalsOverlapping } from "../areIntervalsOverlapping/index.js";
import { isDate } from "../isDate/index.js";
import { isExists } from "../isExists/index.js";
import { isMatch } from "../isMatch/index.js";
import { intervalToDuration } from "../intervalToDuration/index.js";
import { getOverlappingDaysInIntervals } from "../getOverlappingDaysInIntervals/index.js";
import { roundToNearestHours } from "../roundToNearestHours/index.js";
import { roundToNearestMinutes } from "../roundToNearestMinutes/index.js";
import { parseISO } from "../parseISO/index.js";
import { parseJSON } from "../parseJSON/index.js";
import { formatISO } from "../formatISO/index.js";
import { fromUnixTime } from "../fromUnixTime/index.js";
import { format } from "../format/index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("Utility Functions", () => {
  const date = ZonedDateTime.from("2024-07-10T14:30:45.123[Europe/Paris]");
  const wednesday = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");
  const friday = ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]");
  const saturday = ZonedDateTime.from("2024-07-06T12:00:00[Europe/Paris]");
  const sunday = ZonedDateTime.from("2024-07-07T12:00:00[Europe/Paris]");
  const monday = ZonedDateTime.from("2024-07-08T12:00:00[Europe/Paris]");

  describe("nextDay", () => {
    it("returns next day", () => {
      const result = nextDay(wednesday, 4); // Thursday
      expect(result.day).toBe(11);
    });
  });

  describe("nextMonday", () => {
    it("returns next Monday", () => {
      const result = nextMonday(wednesday);
      expect(result.day).toBe(15);
    });
  });

  describe("nextTuesday", () => {
    it("returns next Tuesday", () => {
      const result = nextTuesday(wednesday);
      expect(result.day).toBe(16);
    });
  });

  describe("nextWednesday", () => {
    it("returns next Wednesday", () => {
      const result = nextWednesday(friday);
      expect(result.day).toBe(10);
    });
  });

  describe("nextThursday", () => {
    it("returns next Thursday", () => {
      const result = nextThursday(wednesday);
      expect(result.day).toBe(11);
    });
  });

  describe("nextFriday", () => {
    it("returns next Friday", () => {
      const result = nextFriday(wednesday);
      expect(result.day).toBe(12);
    });
  });

  describe("nextSaturday", () => {
    it("returns next Saturday", () => {
      const result = nextSaturday(wednesday);
      expect(result.day).toBe(13);
    });
  });

  describe("nextSunday", () => {
    it("returns next Sunday", () => {
      const result = nextSunday(wednesday);
      expect(result.day).toBe(14);
    });
  });

  describe("previousDay", () => {
    it("returns previous day", () => {
      const result = previousDay(wednesday, 2); // Tuesday
      expect(result.day).toBe(9);
    });
  });

  describe("previousMonday", () => {
    it("returns previous Monday", () => {
      const result = previousMonday(wednesday);
      expect(result.day).toBe(8);
    });
  });

  describe("previousTuesday", () => {
    it("returns previous Tuesday", () => {
      const result = previousTuesday(wednesday);
      expect(result.day).toBe(9);
    });
  });

  describe("previousWednesday", () => {
    it("returns previous Wednesday", () => {
      const result = previousWednesday(wednesday);
      expect(result.day).toBe(10);
    });
  });

  describe("previousThursday", () => {
    it("returns previous Thursday", () => {
      const result = previousThursday(wednesday);
      expect(result.day).toBe(4);
    });
  });

  describe("previousFriday", () => {
    it("returns previous Friday", () => {
      const result = previousFriday(wednesday);
      expect(result.day).toBe(5);
    });
  });

  describe("previousSaturday", () => {
    it("returns previous Saturday", () => {
      const result = previousSaturday(wednesday);
      expect(result.day).toBe(6);
    });
  });

  describe("previousSunday", () => {
    it("returns previous Sunday", () => {
      const result = previousSunday(wednesday);
      expect(result.day).toBe(7);
    });
  });

  describe("isFuture", () => {
    it("returns false for past date", () => {
      expect(isFuture(wednesday)).toBe(false);
    });
    it("returns true for future date", () => {
      const future = ZonedDateTime.from("2030-01-01T12:00:00[Europe/Paris]");
      expect(isFuture(future)).toBe(true);
    });
  });

  describe("isPast", () => {
    it("returns true for past date", () => {
      expect(isPast(wednesday)).toBe(true);
    });
    it("returns false for future date", () => {
      const future = ZonedDateTime.from("2030-01-01T12:00:00[Europe/Paris]");
      expect(isPast(future)).toBe(false);
    });
  });

  describe("isToday", () => {
    it("returns true for today", () => {
      const today = Temporal.Now.zonedDateTimeISO("Europe/Paris");
      expect(isToday(today)).toBe(true);
    });
    it("returns false for other days", () => {
      expect(isToday(wednesday)).toBe(false);
    });
  });

  describe("isTomorrow", () => {
    it("returns false for today", () => {
      expect(isTomorrow(wednesday)).toBe(false);
    });
  });

  describe("isYesterday", () => {
    it("returns false for today", () => {
      expect(isYesterday(wednesday)).toBe(false);
    });
  });

  describe("isWithinInterval", () => {
    it("returns true when date is within interval", () => {
      const start = ZonedDateTime.from("2024-07-01T12:00:00[Europe/Paris]");
      const end = ZonedDateTime.from("2024-07-31T12:00:00[Europe/Paris]");
      expect(isWithinInterval(wednesday, { start, end })).toBe(true);
    });
    it("returns false when date is outside interval", () => {
      const start = ZonedDateTime.from("2024-08-01T12:00:00[Europe/Paris]");
      const end = ZonedDateTime.from("2024-08-31T12:00:00[Europe/Paris]");
      expect(isWithinInterval(wednesday, { start, end })).toBe(false);
    });
  });

  describe("areIntervalsOverlapping", () => {
    it("returns true for overlapping intervals", () => {
      const interval1 = {
        start: ZonedDateTime.from("2024-07-01T12:00:00[Europe/Paris]"),
        end: ZonedDateTime.from("2024-07-15T12:00:00[Europe/Paris]"),
      };
      const interval2 = {
        start: ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]"),
        end: ZonedDateTime.from("2024-07-20T12:00:00[Europe/Paris]"),
      };
      expect(areIntervalsOverlapping(interval1, interval2)).toBe(true);
    });
    it("returns false for non-overlapping intervals", () => {
      const interval1 = {
        start: ZonedDateTime.from("2024-07-01T12:00:00[Europe/Paris]"),
        end: ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]"),
      };
      const interval2 = {
        start: ZonedDateTime.from("2024-07-15T12:00:00[Europe/Paris]"),
        end: ZonedDateTime.from("2024-07-20T12:00:00[Europe/Paris]"),
      };
      expect(areIntervalsOverlapping(interval1, interval2)).toBe(false);
    });
  });

  describe("isDate", () => {
    it("returns true for ZonedDateTime", () => {
      expect(isDate(wednesday)).toBe(true);
    });
    it("returns false for non-date", () => {
      expect(isDate("2024-07-10")).toBe(false);
    });
  });

  describe("isExists", () => {
    it("returns true for valid date", () => {
      expect(isExists(2024, 7, 10)).toBe(true);
    });
    it("returns false for invalid date", () => {
      expect(isExists(2024, 2, 30)).toBe(false);
    });
  });

  describe("isMatch", () => {
    it("returns true for matching format", () => {
      expect(isMatch("2024-07-10", "yyyy-MM-dd")).toBe(true);
    });
    it("returns false for non-matching format", () => {
      expect(isMatch("07-10-2024", "yyyy-MM-dd")).toBe(false);
    });
  });

  describe("intervalToDuration", () => {
    it("returns duration object", () => {
      const start = ZonedDateTime.from("2024-07-01T12:00:00[Europe/Paris]");
      const end = ZonedDateTime.from("2024-07-10T14:30:00[Europe/Paris]");
      const result = intervalToDuration({ start, end });
      expect(result.days).toBe(9);
    });
  });

  describe("getOverlappingDaysInIntervals", () => {
    it("returns overlapping days", () => {
      const interval1 = {
        start: ZonedDateTime.from("2024-07-01T12:00:00[Europe/Paris]"),
        end: ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]"),
      };
      const interval2 = {
        start: ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]"),
        end: ZonedDateTime.from("2024-07-15T12:00:00[Europe/Paris]"),
      };
      expect(getOverlappingDaysInIntervals(interval1, interval2)).toBe(5);
    });
  });

  describe("roundToNearestHours", () => {
    it("rounds to nearest hour", () => {
      const result = roundToNearestHours(date);
      expect(result.hour).toBe(15);
    });
  });

  describe("roundToNearestMinutes", () => {
    it("rounds to nearest minute", () => {
      const result = roundToNearestMinutes(date);
      expect(result.minute).toBe(31);
    });
  });

  describe("parseISO", () => {
    it("parses ISO string", () => {
      const result = parseISO("2024-07-10T12:00:00[Europe/Paris]");
      expect(result.year).toBe(2024);
      expect(result.month).toBe(7);
      expect(result.day).toBe(10);
    });
  });

  describe("parseJSON", () => {
    it("parses JSON date string", () => {
      const result = parseJSON("2024-07-10T12:00:00.000Z");
      expect(result.year).toBe(2024);
    });
  });

  describe("formatISO", () => {
    it("formats date to ISO", () => {
      const result = formatISO(date);
      expect(result).toContain("2024-07-10");
    });
  });

  describe("fromUnixTime", () => {
    it("creates date from unix time", () => {
      const result = fromUnixTime(1718020800);
      expect(result.year).toBe(2024);
    });
  });

  describe("format", () => {
    it("formats date", () => {
      const result = format(date, "yyyy-MM-dd");
      expect(result).toBe("2024-07-10");
    });
  });
});
