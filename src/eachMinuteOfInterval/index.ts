import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachMinuteOfInterval(interval: Interval): ZonedDateTime[] {
  const minutes: ZonedDateTime[] = [];
  let current = interval.start.with({ second: 0, nanosecond: 0 });
  const end = interval.end.with({ second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= end.epochMilliseconds) {
    minutes.push(current);
    current = current.add({ minutes: 1 });
  }
  
  return minutes;
}
