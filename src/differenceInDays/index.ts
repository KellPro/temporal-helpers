import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { differenceInSeconds } from "../differenceInSeconds/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInDaysOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInDays(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInDaysOptions,
): number {
  const diff = differenceInSeconds(laterDate, earlierDate) / 86400;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
