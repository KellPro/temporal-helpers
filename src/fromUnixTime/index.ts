import { Temporal } from "@js-temporal/polyfill";

export function fromUnixTime(unixTime: number): Temporal.ZonedDateTime {
  const instant = Temporal.Instant.fromEpochSeconds(unixTime);
  return instant.toZonedDateTime({ timeZone: "UTC", calendar: "iso8601" });
}
