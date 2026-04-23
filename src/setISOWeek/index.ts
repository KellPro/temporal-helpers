import { Temporal } from "@js-temporal/polyfill";
import { getISOWeekYear } from "../getISOWeekYear/index.js";
import { getISOWeek } from "../getISOWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setISOWeek(date: ZonedDateTime, isoWeek: number): ZonedDateTime {
  const currentISOWeek = getISOWeek(date);
  const diff = isoWeek - currentISOWeek;
  return date.add({ weeks: diff });
}
