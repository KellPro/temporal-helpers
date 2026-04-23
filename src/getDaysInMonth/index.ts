import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getDaysInMonth(date: ZonedDateTime): number {
  const plainDate = date.toPlainDate();
  const firstOfNextMonth = plainDate.add({ months: 1 }).with({ day: 1 });
  const lastOfMonth = firstOfNextMonth.add({ days: -1 });
  return lastOfMonth.day;
}
