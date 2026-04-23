import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isWeekend(date: ZonedDateTime): boolean {
  const dayOfWeek = date.dayOfWeek;
  return dayOfWeek === 6 || dayOfWeek === 7;
}
