import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInCalendarDaysOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

export function differenceInCalendarDays(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInCalendarDaysOptions,
): number {
  const diff = laterDate
    .toPlainDate()
    .since(earlierDate.toPlainDate(), { largestUnit: "day" }).days;
  return getRoundingMethod(options?.roundingMethod)(diff);
}
