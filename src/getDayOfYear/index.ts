import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function getDayOfYear(date: ZonedDateTime): number {
  const startOfYear = date.with({ month: 1, day: 1, hour: 0, minute: 0, second: 0, nanosecond: 0 });
  const diff = date.since(startOfYear, { largestUnit: "day" });
  return diff.days + 1;
}
