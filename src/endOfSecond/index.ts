import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfSecond(date: ZonedDateTime): ZonedDateTime {
  return date.with({ millisecond: 999, microsecond: 999, nanosecond: 999 });
}
