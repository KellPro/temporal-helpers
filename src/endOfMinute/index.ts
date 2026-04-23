import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfMinute(date: ZonedDateTime): ZonedDateTime {
  return date.with({ second: 59, nanosecond: 999999999 });
}
