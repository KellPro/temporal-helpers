import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function compareAsc(dateLeft: ZonedDateTime, dateRight: ZonedDateTime): number {
  if (dateLeft.epochMilliseconds < dateRight.epochMilliseconds) return -1;
  if (dateLeft.epochMilliseconds > dateRight.epochMilliseconds) return 1;
  return 0;
}
