import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

function startOfISOWeekYearValue(date: ZonedDateTime): ZonedDateTime {
  const midnight = date.with({ hour: 0, minute: 0, second: 0, nanosecond: 0 });
  // The Thursday of a week always falls in the week's ISO week-numbering year.
  const thursday = midnight.add({ days: 4 - midnight.dayOfWeek });
  const jan4 = thursday.with({ month: 1, day: 4 });
  // ISO week 1 is the week containing Jan 4; it starts on the Monday before.
  return jan4.add({ days: 1 - jan4.dayOfWeek });
}

export function getISOWeeksInYear(date: ZonedDateTime): number {
  const weekYearStart = startOfISOWeekYearValue(date);
  const nextWeekYearStart = startOfISOWeekYearValue(weekYearStart.add({ weeks: 60 }));
  const diff = nextWeekYearStart.since(weekYearStart, { largestUnit: "day" });
  return diff.days / 7;
}
