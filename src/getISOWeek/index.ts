import { Temporal } from "@js-temporal/polyfill";
import { getISOWeekYear } from "../getISOWeekYear/index.js";
import { isThursday } from "../isThursday/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

function getFirstThursdayOfYear(year: number, timeZone: string): ZonedDateTime {
  let date = Temporal.ZonedDateTime.from(`${year}-01-01T00:00:00[${timeZone}]`);
  while (!isThursday(date)) {
    date = date.add({ days: 1 });
  }
  return date;
}

export function getISOWeek(date: ZonedDateTime): number {
  const isoWeekYear = getISOWeekYear(date);
  const firstThursday = getFirstThursdayOfYear(isoWeekYear, date.timeZoneId);
  const firstMonday = firstThursday.add({ days: -3 });
  const diff = date.since(firstMonday, { largestUnit: "day" });
  return Math.floor(diff.days / 7) + 1;
}
