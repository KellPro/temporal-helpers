import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function min(dates: ZonedDateTime[]): ZonedDateTime {
  if (dates.length === 0) {
    throw new Error("min requires at least one date");
  }
  
  let minDate = dates[0];
  for (let i = 1; i < dates.length; i++) {
    if (dates[i].epochMilliseconds < minDate.epochMilliseconds) {
      minDate = dates[i];
    }
  }
  
  return minDate;
}
