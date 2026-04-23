import { Temporal } from "@js-temporal/polyfill";
import { getISOWeek } from "../getISOWeek/index.js";
import { getISOWeekYear } from "../getISOWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isSameISOWeek(date: ZonedDateTime, dateToCompare: ZonedDateTime): boolean {
  return getISOWeekYear(date) === getISOWeekYear(dateToCompare) &&
    getISOWeek(date) === getISOWeek(dateToCompare);
}
