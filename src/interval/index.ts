import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function interval(start: ZonedDateTime, end: ZonedDateTime): Interval {
  if (start.epochMilliseconds > end.epochMilliseconds) {
    throw new RangeError("End date must be after start date");
  }
  return { start, end };
}
