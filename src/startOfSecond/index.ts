import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfSecond(date: ZonedDateTime): ZonedDateTime {
  return date.with({ millisecond: 0, microsecond: 0, nanosecond: 0 });
}
