import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function addISOWeekYears(date: ZonedDateTime, amount: number): ZonedDateTime {
  const currentISOWeekYear = date.year;
  const jan4 = date.with({ month: 1, day: 4, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const dayOfWeek = jan4.dayOfWeek;
  const daysToThursday = dayOfWeek <= 4 ? dayOfWeek + 3 : dayOfWeek - 4;
  const firstThursday = jan4.add({ days: daysToThursday - dayOfWeek });
  const isoWeekYear = firstThursday.year;
  
  const newISOWeekYear = isoWeekYear + amount;
  const diff = newISOWeekYear - date.year;
  return date.add({ years: diff });
}
