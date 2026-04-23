import { Temporal } from "@js-temporal/polyfill";
import { getISOWeekYear } from "../getISOWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isSameISOWeekYear(date: ZonedDateTime, dateToCompare: ZonedDateTime): boolean {
  return getISOWeekYear(date) === getISOWeekYear(dateToCompare);
}
