import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

/**
 * Compares two ZonedDateTimes by wall-clock fields only, each in its own time
 * zone (port of date-fns compareLocalAsc for the mixed-zone difference family).
 */
export function compareWallClock(laterDate: ZonedDateTime, earlierDate: ZonedDateTime): number {
  const diff =
    laterDate.year - earlierDate.year ||
    laterDate.month - earlierDate.month ||
    laterDate.day - earlierDate.day ||
    laterDate.hour - earlierDate.hour ||
    laterDate.minute - earlierDate.minute ||
    laterDate.second - earlierDate.second ||
    laterDate.millisecond - earlierDate.millisecond ||
    laterDate.microsecond - earlierDate.microsecond ||
    laterDate.nanosecond - earlierDate.nanosecond;

  if (diff < 0) return -1;
  if (diff > 0) return 1;
  return 0;
}
