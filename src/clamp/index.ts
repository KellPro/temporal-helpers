import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function clamp(date: ZonedDateTime, interval: Interval): ZonedDateTime {
  if (date.epochMilliseconds < interval.start.epochMilliseconds) {
    return interval.start;
  }
  if (date.epochMilliseconds > interval.end.epochMilliseconds) {
    return interval.end;
  }
  return date;
}
