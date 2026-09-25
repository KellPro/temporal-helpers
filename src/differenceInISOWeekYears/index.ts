import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { compareWallClock } from "../_lib/compareWallClock/index.js";
import { differenceInCalendarISOWeekYears } from "../differenceInCalendarISOWeekYears/index.js";
import { addISOWeekYears } from "../addISOWeekYears/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInISOWeekYearsOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInISOWeekYears(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInISOWeekYearsOptions,
): number {
  const sign = compareWallClock(laterDate, earlierDate);
  const diff = Math.abs(differenceInCalendarISOWeekYears(laterDate, earlierDate));

  if (diff === 0) return 0;

  // The last ISO week year is full when the earlier date's anniversary — the
  // same ISO week and weekday in the target ISO week year, with the earlier
  // date's time of day restored (setISOWeekYear resets to midnight) — reaches
  // the later date
  const anniversary = addISOWeekYears(earlierDate, sign * diff).with({
    hour: earlierDate.hour,
    minute: earlierDate.minute,
    second: earlierDate.second,
    millisecond: earlierDate.millisecond,
    microsecond: earlierDate.microsecond,
    nanosecond: earlierDate.nanosecond,
  });
  const isLastISOWeekYearNotFull = compareWallClock(anniversary, laterDate) === sign;

  const result = isLastISOWeekYearNotFull ? sign * (diff - 1) : sign * diff;
  return getRoundingMethod(options?.roundingMethod)(result);
}
