import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function parseJSON(dateStr: string): ZonedDateTime {
  const instant = Temporal.Instant.from(dateStr);
  return instant.toZonedDateTime({ timeZone: "UTC", calendar: "iso8601" });
}
