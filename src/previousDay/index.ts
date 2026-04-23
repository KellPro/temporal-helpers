import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function previousDay(date: ZonedDateTime, dayOfWeek: number): ZonedDateTime {
  const currentDayOfWeek = date.dayOfWeek;
  let daysAgo = currentDayOfWeek - dayOfWeek;
  if (daysAgo < 0) {
    daysAgo += 7;
  } else if (daysAgo === 0) {
    return date;
  }
  return date.subtract({ days: daysAgo });
}
