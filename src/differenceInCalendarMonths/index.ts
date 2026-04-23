import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function differenceInCalendarMonths(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  return (laterDate.year - earlierDate.year) * 12 + (laterDate.month - earlierDate.month);
}
