import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getMilliseconds(date: ZonedDateTime): number {
  return date.millisecond;
}
