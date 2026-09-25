import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfMinute(date: ZonedDateTime): ZonedDateTime {
  return date.with({ second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
}
