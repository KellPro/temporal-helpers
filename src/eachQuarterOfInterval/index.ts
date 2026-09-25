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

  // Compare against the interval end itself. Snapping the end to a quarter
  // start in its own zone and comparing epochs drops a quarter when that
  // midnight is earlier than the same civil date in the start zone.
  while (current.epochMilliseconds <= interval.end.epochMilliseconds) {
    quarters.push(current);
    current = current.add({ months: 3 });
  }
  
  return quarters;
}
