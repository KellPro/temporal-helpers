import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfHour(date: ZonedDateTime): ZonedDateTime {
  return date.with({ minute: 59, second: 59, nanosecond: 999999999 });
}
