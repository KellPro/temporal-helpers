import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfSecond(date: ZonedDateTime): ZonedDateTime {
  return date.with({ nanosecond: 999999999 });
}
