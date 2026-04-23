import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { getISOWeekYear } from "../getISOWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInISOWeekYearsOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInISOWeekYears(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInISOWeekYearsOptions,
): number {
  const yearDiff = getISOWeekYear(laterDate) - getISOWeekYear(earlierDate);
  
  return getRoundingMethod(options?.roundingMethod)(yearDiff);
}
