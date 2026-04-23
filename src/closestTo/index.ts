import { Temporal } from "@js-temporal/polyfill";
import { closestIndexTo } from "../closestIndexTo/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function closestTo(dateToCompare: ZonedDateTime, datesArray: ZonedDateTime[]): ZonedDateTime | null {
  const index = closestIndexTo(dateToCompare, datesArray);
  if (index === null) return null;
  return datesArray[index];
}
