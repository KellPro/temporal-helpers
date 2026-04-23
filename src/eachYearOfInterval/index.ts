import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachYearOfInterval(interval: Interval): ZonedDateTime[] {
  const years: ZonedDateTime[] = [];
  let current = interval.start.with({ month: 1, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const end = interval.end.with({ month: 1, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= end.epochMilliseconds) {
    years.push(current);
    current = current.add({ years: 1 });
  }
  
  return years;
}
