import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function endOfMonth(date: ZonedDateTime): ZonedDateTime {
  const plainDate = date.toPlainDate();
  let firstOfNextMonth: Temporal.PlainDate;
  if (date.month === 12) {
    firstOfNextMonth = plainDate.with({ year: date.year + 1, month: 1, day: 1 });
  } else {
    firstOfNextMonth = plainDate.with({ month: date.month + 1, day: 1 });
  }
  const lastDayOfMonth = firstOfNextMonth.subtract({ days: 1 });
  return date.with({ day: lastDayOfMonth.day, hour: 23, minute: 59, second: 59, nanosecond: 999999999 });
}
