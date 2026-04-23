import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { differenceInSeconds } from "../differenceInSeconds/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInMinutesOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInMinutes(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInMinutesOptions,
): number {
  const diff = differenceInSeconds(laterDate, earlierDate) / 60;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
