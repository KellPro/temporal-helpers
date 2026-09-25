import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

function getFirstThursdayOfYear(year: number, timeZone: string): Temporal.ZonedDateTime {
  const jan1 = Temporal.ZonedDateTime.from(`${year}-01-01T00:00:00[${timeZone}]`);
  const dayOfWeek = jan1.dayOfWeek;
  const daysToThursday = dayOfWeek <= 4 ? 4 - dayOfWeek : 11 - dayOfWeek;
  return jan1.add({ days: daysToThursday });
}

export function getISOWeekYear(date: ZonedDateTime): number {
  // The ISO week-numbering year of a date is the year of the Thursday of its
  // ISO week (e.g. Mon 2024-12-30 belongs to ISO week year 2025)
  const thursdayOfWeek = date.add({ days: 4 - date.dayOfWeek });
  return thursdayOfWeek.year;
}

export function getISOWeek(date: ZonedDateTime): number {
  const isoWeekYear = getISOWeekYear(date);
  const timeZone = date.timeZoneId;
  
  const firstThursday = getFirstThursdayOfYear(isoWeekYear, timeZone);
  const firstMonday = firstThursday.add({ days: -3 });
  
  const diff = date.since(firstMonday, { largestUnit: "day" });
  return Math.floor(diff.days / 7) + 1;
}
