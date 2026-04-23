import { Temporal } from "@js-temporal/polyfill";
import { getISOWeekYear } from "../getISOWeekYear/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setISOWeekYear(date: ZonedDateTime, isoWeekYear: number): ZonedDateTime {
  const currentISOYear = getISOWeekYear(date);
  const diff = isoWeekYear - currentISOYear;
  return date.add({ years: diff });
}
