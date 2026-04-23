import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface AddSecondsOptions {
  relativeTo?: ZonedDateTime;
}

export function addSeconds(
  date: ZonedDateTime,
  amount: number,
  options?: AddSecondsOptions,
): ZonedDateTime {
  return date.add({ seconds: amount });
}
