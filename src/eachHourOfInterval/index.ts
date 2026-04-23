import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachHourOfInterval(interval: Interval): ZonedDateTime[] {
  const hours: ZonedDateTime[] = [];
  let current = interval.start.with({ minute: 0, second: 0, nanosecond: 0 });
  const end = interval.end.with({ minute: 0, second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= end.epochMilliseconds) {
    hours.push(current);
    current = current.add({ hours: 1 });
  }
  
  return hours;
}
