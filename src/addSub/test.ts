import { describe, it, expect } from "vitest";
import { addSeconds } from "../addSeconds/index.js";
import { subSeconds } from "../subSeconds/index.js";
import { addMinutes } from "../addMinutes/index.js";
import { subMinutes } from "../subMinutes/index.js";
import { addHours } from "../addHours/index.js";
import { subHours } from "../subHours/index.js";
import { addDays } from "../addDays/index.js";
import { subDays } from "../subDays/index.js";
import { addWeeks } from "../addWeeks/index.js";
import { subWeeks } from "../subWeeks/index.js";
import { addMonths } from "../addMonths/index.js";
import { subMonths } from "../subMonths/index.js";
import { addYears } from "../addYears/index.js";
import { subYears } from "../subYears/index.js";
import { addMilliseconds } from "../addMilliseconds/index.js";
import { subMilliseconds } from "../subMilliseconds/index.js";
import { addQuarters } from "../addQuarters/index.js";
import { subQuarters } from "../subQuarters/index.js";
import { addBusinessDays } from "../addBusinessDays/index.js";
import { subBusinessDays } from "../subBusinessDays/index.js";
import { addISOWeekYears } from "../addISOWeekYears/index.js";
import { subISOWeekYears } from "../subISOWeekYears/index.js";
import { Temporal } from "@js-temporal/polyfill";

const { ZonedDateTime } = Temporal;

describe("Add/Sub Functions", () => {
  const date = ZonedDateTime.from("2024-07-10T12:00:00[Europe/Paris]");

  describe("addSeconds", () => {
    it("adds seconds", () => {
      const result = addSeconds(date, 30);
      expect(result.second).toBe(30);
    });
    it("handles minute crossing", () => {
      const result = addSeconds(date, 120);
      expect(result.minute).toBe(2);
    });
  });

  describe("subSeconds", () => {
    it("subtracts seconds", () => {
      const result = subSeconds(date, 30);
      expect(result.second).toBe(30);
    });
  });

  describe("addMinutes", () => {
    it("adds minutes", () => {
      const result = addMinutes(date, 30);
      expect(result.minute).toBe(30);
    });
  });

  describe("subMinutes", () => {
    it("subtracts minutes", () => {
      const result = subMinutes(date, 30);
      expect(result.minute).toBe(30);
    });
  });

  describe("addHours", () => {
    it("adds hours", () => {
      const result = addHours(date, 5);
      expect(result.hour).toBe(17);
    });
  });

  describe("subHours", () => {
    it("subtracts hours", () => {
      const result = subHours(date, 5);
      expect(result.hour).toBe(7);
    });
  });

  describe("addDays", () => {
    it("adds days", () => {
      const result = addDays(date, 5);
      expect(result.day).toBe(15);
    });
  });

  describe("subDays", () => {
    it("subtracts days", () => {
      const result = subDays(date, 5);
      expect(result.day).toBe(5);
    });
  });

  describe("addWeeks", () => {
    it("adds weeks", () => {
      const result = addWeeks(date, 1);
      expect(result.day).toBe(17);
    });
  });

  describe("subWeeks", () => {
    it("subtracts weeks", () => {
      const result = subWeeks(date, 1);
      expect(result.day).toBe(3);
    });
  });

  describe("addMonths", () => {
    it("adds months", () => {
      const result = addMonths(date, 2);
      expect(result.month).toBe(9);
    });
  });

  describe("subMonths", () => {
    it("subtracts months", () => {
      const result = subMonths(date, 2);
      expect(result.month).toBe(5);
    });
  });

  describe("addYears", () => {
    it("adds years", () => {
      const result = addYears(date, 1);
      expect(result.year).toBe(2025);
    });
  });

  describe("subYears", () => {
    it("subtracts years", () => {
      const result = subYears(date, 1);
      expect(result.year).toBe(2023);
    });
  });

  describe("addMilliseconds", () => {
    it("adds milliseconds", () => {
      const result = addMilliseconds(date, 1500);
      const diff = result.since(date, { largestUnit: "millisecond" });
      expect(diff.milliseconds).toBe(1500);
    });
  });

  describe("subMilliseconds", () => {
    it("subtracts milliseconds", () => {
      const result = subMilliseconds(date, 1500);
      const diff = date.since(result, { largestUnit: "millisecond" });
      expect(diff.milliseconds).toBe(1500);
    });
  });

  describe("addQuarters", () => {
    it("adds quarters", () => {
      const result = addQuarters(date, 1);
      expect(result.month).toBe(10);
    });
  });

  describe("subQuarters", () => {
    it("subtracts quarters", () => {
      const result = subQuarters(date, 1);
      expect(result.month).toBe(4);
    });
  });

  describe("addBusinessDays", () => {
    it("adds business days", () => {
      const friday = ZonedDateTime.from("2024-07-05T12:00:00[Europe/Paris]");
      const result = addBusinessDays(friday, 1);
      expect(result.day).toBe(7);
    });
  });

  describe("subBusinessDays", () => {
    it("subtracts business days", () => {
      const monday = ZonedDateTime.from("2024-07-08T12:00:00[Europe/Paris]");
      const result = subBusinessDays(monday, 1);
      expect(result.day).toBe(7);
    });
  });

  describe("addISOWeekYears", () => {
    it("adds ISO week years", () => {
      const result = addISOWeekYears(date, 1);
      expect(result.year).toBe(2025);
    });
  });

  describe("subISOWeekYears", () => {
    it("subtracts ISO week years", () => {
      const result = subISOWeekYears(date, 1);
      expect(result.year).toBe(2023);
    });
  });
});
