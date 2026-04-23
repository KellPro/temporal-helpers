import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isFuture(date: ZonedDateTime): boolean {
  return date.epochMilliseconds > Temporal.Now.zonedDateTimeISO().epochMilliseconds;
}
