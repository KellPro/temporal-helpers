import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isThursday(date: ZonedDateTime): boolean {
  return date.dayOfWeek === 4;
}
