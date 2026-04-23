import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isWednesday(date: ZonedDateTime): boolean {
  return date.dayOfWeek === 3;
}
