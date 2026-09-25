import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getISOWeekYear(date: ZonedDateTime): number {
  // The ISO week-numbering year of a date is the year of the Thursday of its
  // ISO week (e.g. Mon 2024-12-30 belongs to ISO week year 2025)
  const thursdayOfWeek = date.add({ days: 4 - date.dayOfWeek });
  return thursdayOfWeek.year;
}
