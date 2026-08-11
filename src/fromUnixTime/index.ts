import { Temporal } from "@js-temporal/polyfill";

export function fromUnixTime(unixTime: number): Temporal.ZonedDateTime {
  const instant = Temporal.Instant.fromEpochMilliseconds(unixTime * 1000);
  return instant.toZonedDateTimeISO("UTC");
}
