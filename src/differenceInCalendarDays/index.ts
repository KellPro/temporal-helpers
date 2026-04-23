import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInCalendarDaysOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInCalendarDays(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInCalendarDaysOptions,
): number {
  const startOfLater = laterDate.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const startOfEarlier = earlierDate.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  const diff = (startOfLater.epochMilliseconds - startOfEarlier.epochMilliseconds) / 86400000;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
