import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInBusinessDaysOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

function isWeekend(date: Temporal.PlainDate): boolean {
  return date.dayOfWeek === 6 || date.dayOfWeek === 7;
}

export function differenceInBusinessDays(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInBusinessDaysOptions,
): number {
  const end = laterDate.toPlainDate();
  let current = earlierDate.toPlainDate();
  const sign = Temporal.PlainDate.compare(end, current) < 0 ? -1 : 1;

  let businessDays = 0;
  while (Temporal.PlainDate.compare(current, end) !== 0) {
    if (!isWeekend(current)) {
      businessDays += sign;
    }
    current = current.add({ days: sign });
  }

  return getRoundingMethod(options?.roundingMethod)(businessDays);
}
