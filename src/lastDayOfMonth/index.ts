import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function lastDayOfMonth(date: ZonedDateTime): ZonedDateTime {
  const plainDate = date.toPlainDate();
  const firstOfNextMonth = plainDate.add({ months: 1 }).with({ day: 1 });
  const lastDay = firstOfNextMonth.add({ days: -1 }).day;
  return date.with({ day: lastDay, hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
