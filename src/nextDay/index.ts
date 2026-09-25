import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function nextDay(date: ZonedDateTime, dayOfWeek: number): ZonedDateTime {
  const targetDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  const currentDayOfWeek = date.dayOfWeek;
  let daysUntil = targetDayOfWeek - currentDayOfWeek;
  if (daysUntil <= 0) {
    daysUntil += 7;
  }
  return date.add({ days: daysUntil });
}
