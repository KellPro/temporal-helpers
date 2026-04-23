import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachQuarterOfInterval(interval: Interval): ZonedDateTime[] {
  const quarters: ZonedDateTime[] = [];
  
  const startQuarter = Math.ceil(interval.start.month / 3);
  let current = interval.start.with({ month: startQuarter, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  const endQuarter = Math.ceil(interval.end.month / 3);
  const end = interval.end.with({ month: endQuarter, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  while (current.epochMilliseconds <= end.epochMilliseconds) {
    quarters.push(current);
    current = current.add({ months: 3 });
  }
  
  return quarters;
}
