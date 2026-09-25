import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

const nanosecondsInDay = 86400000000000n;

/**
 * Non-date-fns helper: signed number of exact elapsed 24-hour days between two
 * instants. Zone-independent — both time zones are ignored entirely; only the
 * epoch distance (nanosecond precision) is compared. Unlike `differenceInDays`,
 * this counts real elapsed time, so a 23-hour span across a DST spring-forward
 * returns 0.
 */
export function differenceInElapsedDays(
  laterDate: ZonedDateTime,
  earlierDate: ZonedDateTime,
): number {
  // BigInt division truncates towards zero and cannot produce -0
  return Number((laterDate.epochNanoseconds - earlierDate.epochNanoseconds) / nanosecondsInDay);
}
