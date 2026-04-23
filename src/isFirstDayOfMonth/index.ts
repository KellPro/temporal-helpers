import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isFirstDayOfMonth(date: ZonedDateTime): boolean {
  return date.day === 1;
}
