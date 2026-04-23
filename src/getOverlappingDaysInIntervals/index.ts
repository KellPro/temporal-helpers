import { Temporal } from "@js-temporal/polyfill";
import { areIntervalsOverlapping } from "../areIntervalsOverlapping/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export function getOverlappingDaysInIntervals(intervalLeft: Interval, intervalRight: Interval): number {
  if (!areIntervalsOverlapping(intervalLeft, intervalRight)) return 0;
  
  const overlapStart = intervalLeft.start.epochMilliseconds > intervalRight.start.epochMilliseconds
    ? intervalLeft.start
    : intervalRight.start;
    
  const overlapEnd = intervalLeft.end.epochMilliseconds < intervalRight.end.epochMilliseconds
    ? intervalLeft.end
    : intervalRight.end;
  
  const overlapDays = Math.round((overlapEnd.epochMilliseconds - overlapStart.epochMilliseconds) / 86400000);
  
  return Math.max(0, overlapDays);
}
