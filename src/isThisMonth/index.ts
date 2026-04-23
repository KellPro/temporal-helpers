import { Temporal } from "@js-temporal/polyfill";
import { isSameMonth } from "../isSameMonth/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThisMonth(date: ZonedDateTime, referenceDate: ZonedDateTime = Temporal.Now.zonedDateTimeISO()): boolean {
  return isSameMonth(date, referenceDate);
}
