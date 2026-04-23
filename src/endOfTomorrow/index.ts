import { Temporal } from "@js-temporal/polyfill";
import { endOfDay } from "../endOfDay/index.js";
import { addDays } from "../addDays/index.js";

export function endOfTomorrow(): Temporal.ZonedDateTime {
  const tomorrow = addDays(Temporal.Now.zonedDateTimeISO(), 1);
  return endOfDay(tomorrow);
}
