import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfDay(date: ZonedDateTime): ZonedDateTime {
  return date.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
}
