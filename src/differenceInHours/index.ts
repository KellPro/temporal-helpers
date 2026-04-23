import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { differenceInSeconds } from "../differenceInSeconds/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInHoursOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInHours(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInHoursOptions,
): number {
  const diff = differenceInSeconds(laterDate, earlierDate) / 3600;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
