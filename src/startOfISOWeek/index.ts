import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function startOfISOWeek(date: ZonedDateTime): ZonedDateTime {
  const dayOfWeek = date.dayOfWeek;
  const diff = dayOfWeek - 1;
  return date.subtract({ days: diff }).with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
}
