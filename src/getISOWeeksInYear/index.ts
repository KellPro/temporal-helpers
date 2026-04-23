import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

function getISOWeekYearValue(date: ZonedDateTime): number {
  const jan4 = date.with({ month: 1, day: 4, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const dayOfWeek = jan4.dayOfWeek;
  const daysToThursday = dayOfWeek <= 4 ? dayOfWeek + 3 : dayOfWeek - 4;
  const firstThursday = jan4.add({ days: daysToThursday - dayOfWeek });
  return firstThursday.year;
}

function getISOWeekValue(date: ZonedDateTime): number {
  const jan4 = date.with({ month: 1, day: 4, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const dayOfWeek = jan4.dayOfWeek;
  const daysToThursday = dayOfWeek <= 4 ? dayOfWeek + 3 : dayOfWeek - 4;
  const firstThursday = jan4.add({ days: daysToThursday - dayOfWeek });
  
  const diff = date.since(firstThursday);
  return Math.floor(diff.days / 7) + 1;
}

export function getISOWeeksInYear(date: ZonedDateTime): number {
  const year = getISOWeekYearValue(date);
  const jan4 = date.with({ year, month: 1, day: 4, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const dayOfWeek = jan4.dayOfWeek;
  const daysToThursday = dayOfWeek <= 4 ? dayOfWeek + 3 : dayOfWeek - 4;
  const firstThursday = jan4.add({ days: daysToThursday - dayOfWeek });
  
  const dec28 = firstThursday.add({ days: 364 });
  return getISOWeekValue(dec28);
}
