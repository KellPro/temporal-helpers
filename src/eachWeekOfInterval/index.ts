import { Temporal } from "@js-temporal/polyfill";
import { startOfWeek } from "../startOfWeek/index.js";

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
  if (interval.start.epochMilliseconds > interval.end.epochMilliseconds) {
    throw new RangeError("End date must be after start date");
  }

  const weekStartsOn = options?.weekStartsOn ?? 0;
  const weeks: ZonedDateTime[] = [];

  let current = startOfWeek(interval.start, { weekStartsOn });

  while (current.epochMilliseconds <= interval.end.epochMilliseconds) {
    weeks.push(current);
    current = current.add({ weeks: 1 });
  }

  return weeks;
}
