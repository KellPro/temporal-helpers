import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface Interval {
  start: ZonedDateTime;
  end: ZonedDateTime;
}

export interface Duration {
  years?: number;
  months?: number;
  weeks?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
}

export function intervalToDuration(interval: Interval): Duration {
  const duration: Duration = {};
  
  const years = interval.end.year - interval.start.year;
  if (years !== 0) duration.years = years;
  
  const months = interval.end.month - interval.start.month;
  if (months !== 0) duration.months = months;
  
  const days = interval.end.day - interval.start.day;
  if (days !== 0) duration.days = days;
  
  const hours = interval.end.hour - interval.start.hour;
  if (hours !== 0) duration.hours = hours;
  
  const minutes = interval.end.minute - interval.start.minute;
  if (minutes !== 0) duration.minutes = minutes;
  
  const seconds = interval.end.second - interval.start.second;
  if (seconds !== 0) duration.seconds = seconds;
  
  const milliseconds = interval.end.millisecond - interval.start.millisecond;
  if (milliseconds !== 0) duration.milliseconds = milliseconds;
  
  return duration;
}
