import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isSameSecond(date: ZonedDateTime, dateToCompare: ZonedDateTime): boolean {
  return date.year === dateToCompare.year &&
    date.month === dateToCompare.month &&
    date.day === dateToCompare.day &&
    date.hour === dateToCompare.hour &&
    date.minute === dateToCompare.minute &&
    date.second === dateToCompare.second;
}
