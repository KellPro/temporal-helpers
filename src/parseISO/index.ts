import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function parseISO(isoString: string): ZonedDateTime {
  return Temporal.ZonedDateTime.from(isoString);
}
