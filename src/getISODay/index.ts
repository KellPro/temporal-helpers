import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getISODay(date: ZonedDateTime): number {
  return date.dayOfWeek === 0 ? 7 : date.dayOfWeek;
}
