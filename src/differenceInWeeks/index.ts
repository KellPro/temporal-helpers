import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { differenceInDays } from "../differenceInDays/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInWeeksOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInWeeks(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInWeeksOptions,
): number {
  const diff = differenceInDays(laterDate, earlierDate, options) / 7;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
