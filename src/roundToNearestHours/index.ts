import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface RoundToNearestHoursOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function roundToNearestHours(date: ZonedDateTime, options?: RoundToNearestHoursOptions): ZonedDateTime {
  const roundingMethod = options?.roundingMethod ?? "round";
  const hour = date.hour;
  const minute = date.minute;
  const second = date.second;
  const nanosecond = date.nanosecond;
  
  const totalMinutes = hour * 60 + minute + (second + nanosecond / 1e9) / 60;
  const nearestHour = Math[roundingMethod](totalMinutes / 60);
  
  return date.with({ hour: nearestHour, minute: 0, second: 0, nanosecond: 0 });
}
