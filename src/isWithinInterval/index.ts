import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function isWithinInterval(date: ZonedDateTime, interval: Interval): boolean {
  return date.epochMilliseconds >= interval.start.epochMilliseconds &&
    date.epochMilliseconds <= interval.end.epochMilliseconds;
}
