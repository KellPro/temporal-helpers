import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getYear(date: ZonedDateTime): number {
  return date.year;
}
