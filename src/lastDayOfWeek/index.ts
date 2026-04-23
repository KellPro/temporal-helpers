import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface LastDayOfWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function lastDayOfWeek(date: ZonedDateTime, options?: LastDayOfWeekOptions): ZonedDateTime {
  const weekStartsOn = options?.weekStartsOn ?? 0;
  const dayOfWeek = date.dayOfWeek;
  const diff = (weekStartsOn - dayOfWeek + 7) % 7;
  return date.add({ days: diff }).with({ hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
