import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachWeekendOfInterval(interval: Interval): ZonedDateTime[] {
  const weekends: ZonedDateTime[] = [];
  let current = interval.start.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const end = interval.end.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= end.epochMilliseconds) {
    if (current.dayOfWeek === 0 || current.dayOfWeek === 6) {
      weekends.push(current);
    }
    current = current.add({ days: 1 });
  }
  
  return weekends;
}
