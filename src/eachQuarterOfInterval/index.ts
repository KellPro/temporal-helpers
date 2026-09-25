import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function eachQuarterOfInterval(interval: Interval): ZonedDateTime[] {
  if (interval.start.epochMilliseconds > interval.end.epochMilliseconds) {
    throw new RangeError("End date must be after start date");
  }

  const quarters: ZonedDateTime[] = [];

  const startFirstMonth = interval.start.month - ((interval.start.month - 1) % 3);
  let current = interval.start.with({ month: startFirstMonth, day: 1 }).startOfDay();

  const endFirstMonth = interval.end.month - ((interval.end.month - 1) % 3);
  const end = interval.end.with({ month: endFirstMonth, day: 1 }).startOfDay();

  while (current.epochMilliseconds <= end.epochMilliseconds) {
    quarters.push(current);
    current = current.add({ months: 3 });
  }
  
  return quarters;
}
