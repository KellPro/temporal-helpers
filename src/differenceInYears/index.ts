import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { compareWallClock } from "../_lib/compareWallClock/index.js";
import { differenceInCalendarYears } from "../differenceInCalendarYears/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInYearsOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInYears(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInYearsOptions,
): number {
  const sign = compareWallClock(laterDate, earlierDate);
  const diff = Math.abs(differenceInCalendarYears(laterDate, earlierDate));

  if (diff === 0) return 0;

  // The last year is full when the earlier date's anniversary — with a leap
  // day clamped into the target year by Temporal — reaches the later date
  const anniversary = earlierDate.add({ years: sign * diff });
  const isLastYearNotFull = compareWallClock(anniversary, laterDate) === sign;

  const result = isLastYearNotFull ? sign * (diff - 1) : sign * diff;
  return getRoundingMethod(options?.roundingMethod)(result);
}
