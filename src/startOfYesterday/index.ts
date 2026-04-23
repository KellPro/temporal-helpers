import { Temporal } from "@js-temporal/polyfill";
import { startOfDay } from "../startOfDay/index.js";
import { subDays } from "../subDays/index.js";

export function startOfYesterday(): Temporal.ZonedDateTime {
  const yesterday = subDays(Temporal.Now.zonedDateTimeISO(), 1);
  return startOfDay(yesterday);
}
