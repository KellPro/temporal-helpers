import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getDay(date: ZonedDateTime): number {
  return date.dayOfWeek;
}
