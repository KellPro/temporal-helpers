import { Temporal } from "@js-temporal/polyfill";
import { getRoundingMethod } from "../_lib/getRoundingMethod/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface DifferenceInBusinessDaysOptions {
  roundingMethod?: "ceil" | "floor" | "round" | "trunc";
}

function isWeekend(date: ZonedDateTime): boolean {
  return date.dayOfWeek === 0 || date.dayOfWeek === 6;
}

export function differenceInBusinessDays(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
  options?: DifferenceInBusinessDaysOptions,
): number {
  const start = earlierDate.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const end = laterDate.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  
  const totalDays = Math.round((end.epochMilliseconds - start.epochMilliseconds) / 86400000);
  
  let businessDays = 0;
  let current = start;
  
  if (totalDays >= 0) {
    for (let i = 0; i <= totalDays; i++) {
      if (!isWeekend(current)) {
        businessDays++;
      }
      current = current.add({ days: 1 });
    }
    businessDays -= 1;
  } else {
    for (let i = 0; i >= totalDays; i--) {
      if (!isWeekend(current)) {
        businessDays--;
      }
      current = current.subtract({ days: 1 });
    }
    businessDays += 1;
  }
  
  return getRoundingMethod(options?.roundingMethod)(businessDays);
}
