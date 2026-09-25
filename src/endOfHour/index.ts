import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfHour(date: ZonedDateTime): ZonedDateTime {
  return date.with({ minute: 59, second: 59, millisecond: 999, microsecond: 999, nanosecond: 999 });
}
