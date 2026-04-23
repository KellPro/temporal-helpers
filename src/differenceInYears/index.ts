import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInYearsOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInYears(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInYearsOptions,
): number {
  const yearDiff = laterDate.year - earlierDate.year;
  
  const monthDiff = laterDate.month - earlierDate.month;
  const dayDiff = laterDate.day - earlierDate.day;
  
  let diff = yearDiff;
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    diff -= 1;
  }
  
  return getRoundingMethod(options?.roundingMethod)(diff);
}
