import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function areIntervalsOverlapping(intervalLeft: Interval, intervalRight: Interval): boolean {
  return intervalLeft.start.epochMilliseconds < intervalRight.end.epochMilliseconds &&
    intervalLeft.end.epochMilliseconds > intervalRight.start.epochMilliseconds;
}
