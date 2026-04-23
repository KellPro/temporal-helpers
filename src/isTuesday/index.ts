import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isTuesday(date: ZonedDateTime): boolean {
  return date.dayOfWeek === 2;
}
