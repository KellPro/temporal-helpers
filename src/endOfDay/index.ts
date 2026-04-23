import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfDay(date: ZonedDateTime): ZonedDateTime {
  return date.with({ hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
