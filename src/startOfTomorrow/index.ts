import { Temporal } from "@js-temporal/polyfill";
import { startOfDay } from "../startOfDay/index.js";
import { addDays } from "../addDays/index.js";

export function startOfTomorrow(): Temporal.ZonedDateTime {
  const tomorrow = addDays(Temporal.Now.zonedDateTimeISO(), 1);
  return startOfDay(tomorrow);
}
