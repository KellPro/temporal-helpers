import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfYear(date: ZonedDateTime): ZonedDateTime {
  return date.with({ month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0, microsecond: 0, nanosecond: 0 });
}
