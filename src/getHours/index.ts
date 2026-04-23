import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getHours(date: ZonedDateTime): number {
  return date.hour;
}
