import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfDecade(date: ZonedDateTime): ZonedDateTime {
  const year = date.year;
  const decadeStart = Math.floor(year / 10) * 10;
  return date.with({ year: decadeStart, month: 1, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
}
