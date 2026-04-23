import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isSameHour(date: ZonedDateTime, dateToCompare: ZonedDateTime): boolean {
  return date.year === dateToCompare.year &&
    date.month === dateToCompare.month &&
    date.day === dateToCompare.day &&
    date.hour === dateToCompare.hour;
}
