import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfHour(date: ZonedDateTime): ZonedDateTime {
  return date.with({ minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
}
