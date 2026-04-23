import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachMonthOfInterval(interval: Interval): ZonedDateTime[] {
  const months: ZonedDateTime[] = [];
  let current = interval.start.with({ day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const end = interval.end.with({ day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= end.epochMilliseconds) {
    months.push(current);
    current = current.add({ months: 1 });
  }
  
  return months;
}
