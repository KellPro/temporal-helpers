import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function lastDayOfDecade(date: ZonedDateTime): ZonedDateTime {
  const year = date.year;
  const decadeEnd = Math.floor(year / 10) * 10 + 9;
  return date.with({ year: decadeEnd, month: 12, day: 31, hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
