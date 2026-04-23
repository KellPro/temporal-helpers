import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function max(dates: ZonedDateTime[]): ZonedDateTime {
  if (dates.length === 0) {
    throw new Error("max requires at least one date");
  }
  
  let maxDate = dates[0];
  for (let i = 1; i < dates.length; i++) {
    if (dates[i].epochMilliseconds > maxDate.epochMilliseconds) {
      maxDate = dates[i];
    }
  }
  
  return maxDate;
}
