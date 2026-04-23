import { Temporal } from "@js-temporal/polyfill";
import { isSameWeek } from "../isSameWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface IsThisWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function isThisWeek(date: ZonedDateTime, options?: IsThisWeekOptions, referenceDate?: ZonedDateTime): boolean {
  const ref = referenceDate ?? Temporal.Now.zonedDateTimeISO(date.getTimeZone().id);
  return isSameWeek(date, ref, options);
}
