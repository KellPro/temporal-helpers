import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface StartOfWeekOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function startOfWeek(date: ZonedDateTime, options?: StartOfWeekOptions): ZonedDateTime {
  const weekStartsOn = options?.weekStartsOn ?? 0;
  let dayOfWeek = date.dayOfWeek;
  if (dayOfWeek === 7) dayOfWeek = 0;
  const diff = (dayOfWeek - weekStartsOn + 7) % 7;
  return date.subtract({ days: diff }).with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
}
