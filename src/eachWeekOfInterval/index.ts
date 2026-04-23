import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export interface EachWeekOfIntervalOptions {
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function eachWeekOfInterval(
  interval: Interval,
  options?: EachWeekOfIntervalOptions,
): ZonedDateTime[] {
  const weekStartsOn = options?.weekStartsOn ?? 0;
  const weeks: ZonedDateTime[] = [];
  
  const startDayOfWeek = interval.start.dayOfWeek;
  const startDiff = (startDayOfWeek - weekStartsOn + 7) % 7;
  let current = interval.start.subtract({ days: startDiff });
  current = current.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  const endDayOfWeek = interval.end.dayOfWeek;
  const endDiff = (weekStartsOn - endDayOfWeek + 7) % 7;
  const end = interval.end.add({ days: endDiff });
  const normalizedEnd = end.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= normalizedEnd.epochMilliseconds) {
    weeks.push(current);
    current = current.add({ weeks: 1 });
  }
  
  return weeks;
}
