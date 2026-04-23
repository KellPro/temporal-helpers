import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachDayOfInterval(interval: Interval): ZonedDateTime[] {
  const days: ZonedDateTime[] = [];
  let current = interval.start.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const end = interval.end.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= end.epochMilliseconds) {
    days.push(current);
    current = current.add({ days: 1 });
  }
  
  return days;
}
