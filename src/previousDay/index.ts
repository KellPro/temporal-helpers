import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function previousDay(date: ZonedDateTime, dayOfWeek: number): ZonedDateTime {
  const targetDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
  const currentDayOfWeek = date.dayOfWeek;
  let daysAgo = currentDayOfWeek - targetDayOfWeek;
  if (daysAgo <= 0) {
    daysAgo += 7;
  }
  return date.subtract({ days: daysAgo });
}
