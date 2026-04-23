import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInSecondsOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInSeconds(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInSecondsOptions,
): number {
  const diff =
    (laterDate.epochMilliseconds - earlierDate.epochMilliseconds) / 1000;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
