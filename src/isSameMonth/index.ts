import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isSameMonth(date: ZonedDateTime, dateToCompare: ZonedDateTime): boolean {
  return date.year === dateToCompare.year && date.month === dateToCompare.month;
}
