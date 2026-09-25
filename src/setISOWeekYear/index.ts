import { Temporal } from "@js-temporal/polyfill";
import { startOfISOWeekYear } from "../startOfISOWeekYear/index.js";
import { differenceInCalendarDays } from "../differenceInCalendarDays/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setISOWeekYear(date: ZonedDateTime, isoWeekYear: number): ZonedDateTime {
  const dayOfISOYear = differenceInCalendarDays(date, startOfISOWeekYear(date));
  const fourthOfJanuary = date.with({
    year: isoWeekYear,
    month: 1,
    day: 4,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  });
  return startOfISOWeekYear(fourthOfJanuary).add({ days: dayOfISOYear });
}
