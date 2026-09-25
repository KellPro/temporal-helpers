import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { compareWallClock } from "../_lib/compareWallClock/index.js";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInDaysOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInDays(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInDaysOptions,
): number {
  const sign = compareWallClock(laterDate, earlierDate);
  const difference = Math.abs(differenceInCalendarDays(laterDate, earlierDate));

  const workingLaterDate = laterDate.subtract({ days: sign * difference });

  // The last calendar day is not full when, after removing the whole calendar
  // days, the later date's wall-clock time of day is before the earlier date's
  const isLastDayNotFull = compareWallClock(workingLaterDate, earlierDate) === -sign;

  const result = isLastDayNotFull ? sign * (difference - 1) : sign * difference;
  return getRoundingMethod(options?.roundingMethod)(result);
}
