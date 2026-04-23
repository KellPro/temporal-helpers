import { Temporal } from "@js-temporal/polyfill";
import { isSameISOWeek } from "../isSameISOWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThisISOWeek(date: ZonedDateTime, referenceDate: ZonedDateTime = Temporal.Now.zonedDateTimeISO()): boolean {
  return isSameISOWeek(date, referenceDate);
}
