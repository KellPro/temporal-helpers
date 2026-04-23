import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isSameQuarter(date: ZonedDateTime, dateToCompare: ZonedDateTime): boolean {
  return date.year === dateToCompare.year &&
    Math.ceil(date.month / 3) === Math.ceil(dateToCompare.month / 3);
}
