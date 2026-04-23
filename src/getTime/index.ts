import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getTime(date: ZonedDateTime): number {
  return date.epochMilliseconds;
}
