import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfMonth(date: ZonedDateTime): ZonedDateTime {
  return date.with({ day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
}
