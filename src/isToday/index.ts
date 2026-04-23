import { Temporal } from "@js-temporal/polyfill";
import { isSameDay } from "../isSameDay/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isToday(date: ZonedDateTime, referenceDate: ZonedDateTime = Temporal.Now.zonedDateTimeISO()): boolean {
  return isSameDay(date, referenceDate);
}
