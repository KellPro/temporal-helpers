import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getMonth(date: ZonedDateTime): number {
  return date.month;
}
