import { Temporal } from "@js-temporal/polyfill";
import { startOfDay } from "../startOfDay/index.js";

export function startOfToday(): Temporal.ZonedDateTime {
  return startOfDay(Temporal.Now.zonedDateTimeISO());
}
