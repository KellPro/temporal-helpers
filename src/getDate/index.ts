import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getDate(date: ZonedDateTime): number {
  return date.day;
}
