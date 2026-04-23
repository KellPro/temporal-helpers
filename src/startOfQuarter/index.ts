import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfQuarter(date: ZonedDateTime): ZonedDateTime {
  const quarterStartMonth = Math.ceil(date.month / 3) * 3 - 2;
  return date.with({ month: quarterStartMonth, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
}
