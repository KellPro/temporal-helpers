import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface EndOfWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function endOfWeek(date: ZonedDateTime, options?: EndOfWeekOptions): ZonedDateTime {
  const weekStartsOn = options?.weekStartsOn ?? 0;
  const weekEndsOn = (weekStartsOn + 6) % 7;
  let dayOfWeek = date.dayOfWeek;
  if (dayOfWeek === 7) dayOfWeek = 0;
  const diff = (weekEndsOn - dayOfWeek + 7) % 7;
  return date.add({ days: diff }).with({ hour: 23, minute: 59, second: 59, millisecond: 999, microsecond: 999, nanosecond: 999 });
}
