import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInCalendarWeeksOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function differenceInCalendarWeeks(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInCalendarWeeksOptions,
): number {
  const weekStartsOn = options?.weekStartsOn ?? 0;
  
  const laterDayOfWeek = laterDate.dayOfWeek;
  const earlierDayOfWeek = earlierDate.dayOfWeek;
  
  const laterAdjusted = laterDate.subtract({ days: ((laterDayOfWeek - weekStartsOn + 7) % 7) });
  const earlierAdjusted = earlierDate.subtract({ days: ((earlierDayOfWeek - weekStartsOn + 7) % 7) });
  
  const startOfLater = laterAdjusted.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const startOfEarlier = earlierAdjusted.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  const diff = (startOfLater.epochMilliseconds - startOfEarlier.epochMilliseconds) / (86400000 * 7);
  return getRoundingMethod(options?.roundingMethod)(diff);
}
