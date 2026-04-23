import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInMonthsOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInMonths(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInMonthsOptions,
): number {
  const yearDiff = laterDate.year - earlierDate.year;
  const monthDiff = laterDate.month - earlierDate.month;
  const dayDiff = laterDate.day - earlierDate.day;
  
  let diff = yearDiff * 12 + monthDiff;
  
  if (dayDiff < 0) {
    diff -= 1;
  }
  
  return getRoundingMethod(options?.roundingMethod)(diff);
}
