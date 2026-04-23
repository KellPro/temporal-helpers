import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function nextDay(date: ZonedDateTime, dayOfWeek: number): ZonedDateTime {
  const currentDayOfWeek = date.dayOfWeek;
  let daysUntil = dayOfWeek - currentDayOfWeek;
  if (daysUntil < 0) {
    daysUntil += 7;
  } else if (daysUntil === 0) {
    return date;
  }
  return date.add({ days: daysUntil });
}
