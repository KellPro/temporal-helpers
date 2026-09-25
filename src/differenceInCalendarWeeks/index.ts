import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";
import { startOfWeek } from "../startOfWeek/index.js";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInCalendarWeeksOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

export function differenceInCalendarWeeks(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInCalendarWeeksOptions,
): number {
  const weekStartsOn = options?.weekStartsOn ?? 0;

  const laterStartOfWeek = startOfWeek(laterDate, { weekStartsOn });
  const earlierStartOfWeek = startOfWeek(earlierDate, { weekStartsOn });

  const diff = differenceInCalendarDays(laterStartOfWeek, earlierStartOfWeek) / 7;
  return getRoundingMethod(options?.roundingMethod ?? "round")(diff);
}
