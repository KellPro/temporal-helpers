import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInCalendarYears(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  return laterDate.year - earlierDate.year;
}
