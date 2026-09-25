import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { compareWallClock } from "../_lib/compareWallClock/index.js";
import { differenceInCalendarMonths } from "../differenceInCalendarMonths/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInMonthsOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInMonths(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInMonthsOptions,
): number {
  const sign = compareWallClock(laterDate, earlierDate);
  const difference = Math.abs(differenceInCalendarMonths(laterDate, earlierDate));

  if (difference === 0) return 0;

  // The last month is full when the earlier date's anniversary — with the
  // day-of-month clamped into the target month by Temporal — reaches the
  // later date
  const anniversary = earlierDate.add({ months: sign * difference });
  const isLastMonthNotFull = compareWallClock(anniversary, laterDate) === sign;

  const result = isLastMonthNotFull ? sign * (difference - 1) : sign * difference;
  return getRoundingMethod(options?.roundingMethod)(result);
}
