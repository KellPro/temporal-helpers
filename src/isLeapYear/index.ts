import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function isLeapYear(date: ZonedDateTime): boolean {
  const year = date.year;
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
