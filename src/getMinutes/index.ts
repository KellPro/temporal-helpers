import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getMinutes(date: ZonedDateTime): number {
  return date.minute;
}
