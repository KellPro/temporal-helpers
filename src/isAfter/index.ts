import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isAfter(date: ZonedDateTime, dateToCompare: ZonedDateTime): boolean {
  return date.epochMilliseconds > dateToCompare.epochMilliseconds;
}
