import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isSaturday(date: ZonedDateTime): boolean {
  return date.dayOfWeek === 6;
}
