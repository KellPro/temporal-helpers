import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getISOWeek(date: ZonedDateTime): number {
  const jan4 = date.with({ month: 1, day: 4, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const dayOfWeek = jan4.dayOfWeek;
  const daysToThursday = dayOfWeek <= 4 ? 4 - dayOfWeek : 11 - dayOfWeek;
  const firstThursday = jan4.add({ days: daysToThursday });
  
  const firstMonday = firstThursday.add({ days: -3 });
  const diff = date.since(firstMonday, { largestUnit: "day" });
  return Math.floor(diff.days / 7) + 1;
}
