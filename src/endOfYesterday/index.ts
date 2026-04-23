import { Temporal } from "@js-temporal/polyfill";
import { endOfDay } from "../endOfDay/index.js";
import { subDays } from "../subDays/index.js";

export function endOfYesterday(): Temporal.ZonedDateTime {
  const yesterday = subDays(Temporal.Now.zonedDateTimeISO(), 1);
  return endOfDay(yesterday);
}
