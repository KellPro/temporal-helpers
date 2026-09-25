import { Temporal } from "@js-temporal/polyfill";
import { getISOWeekYear } from "../getISOWeekYear/index.js";
import { startOfISOWeek } from "../startOfISOWeek/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfISOWeekYear(date: ZonedDateTime): ZonedDateTime {
  // ISO weeks run Monday–Sunday, and week 1 of an ISO year is the week
  // containing its first Thursday — which is why January 4th always sits in
  // week 1 of its own year. January 1st cannot anchor this: it can belong to
  // the previous ISO week-year (Jan 1 2023, a Sunday, fell in week 52 of ISO
  // 2022). Week membership follows the week's Thursday, so a straddling week
  // starting Monday Dec 31 is already week 1 of the new ISO year.
  //
  // The end of ISO week year Y is therefore one nanosecond before the Monday
  // that starts ISO year Y + 1, derived from that year's Jan 4 — ISO years
  // vary between 52 and 53 weeks, so a fixed day-count would drift.
  const isoWeekYear = getISOWeekYear(date);
  const fourthOfJanuaryNextYear = date.with({
    year: isoWeekYear + 1,
    month: 1,
    day: 4,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
    microsecond: 0,
    nanosecond: 0,
  });
  return startOfISOWeek(fourthOfJanuaryNextYear).subtract({ nanoseconds: 1 });
}
