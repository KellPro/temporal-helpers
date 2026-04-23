import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setISODay(date: ZonedDateTime, day: number): ZonedDateTime {
  const currentDay = date.dayOfWeek === 0 ? 7 : date.dayOfWeek;
  const diff = day - currentDay;
  return date.add({ days: diff });
}
