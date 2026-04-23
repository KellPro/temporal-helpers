import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfISOWeek(date: ZonedDateTime): ZonedDateTime {
  const dayOfWeek = date.dayOfWeek;
  const diff = 7 - dayOfWeek;
  return date.add({ days: diff }).with({ hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
