import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface RoundToNearestMinutesOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function roundToNearestMinutes(date: ZonedDateTime, options?: RoundToNearestMinutesOptions): ZonedDateTime {
  const roundingMethod = options?.roundingMethod ?? "round";
  const minute = date.minute;
  const second = date.second;
  const nanosecond = date.nanosecond;
  
  const totalSeconds = minute * 60 + second + nanosecond / 1e9;
  const nearestMinute = Math[roundingMethod](totalSeconds / 60);
  
  return date.with({ minute: nearestMinute, second: 0, nanosecond: 0 });
}
