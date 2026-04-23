import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function lastDayOfQuarter(date: ZonedDateTime): ZonedDateTime {
  const quarterEndMonth = Math.ceil(date.month / 3) * 3;
  const plainDate = date.with({ month: quarterEndMonth }).toPlainDate();
  const firstOfNextQuarter = plainDate.add({ months: 1 }).with({ day: 1 });
  const lastDay = firstOfNextQuarter.add({ days: -1 }).day;
  return date.with({ month: quarterEndMonth, day: lastDay, hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
