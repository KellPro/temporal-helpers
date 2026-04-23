import { Temporal } from "@js-temporal/polyfill";
import { endOfDay } from "../endOfDay/index.js";

export function endOfToday(): Temporal.ZonedDateTime {
  return endOfDay(Temporal.Now.zonedDateTimeISO());
}
