import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function lastDayOfYear(date: ZonedDateTime): ZonedDateTime {
  return date.with({ month: 12, day: 31, hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
