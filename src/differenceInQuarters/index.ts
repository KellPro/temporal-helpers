import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { differenceInMonths } from "../differenceInMonths/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInQuartersOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInQuarters(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInQuartersOptions,
): number {
  const diff = differenceInMonths(laterDate, earlierDate) / 3;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
