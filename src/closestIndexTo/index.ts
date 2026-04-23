import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function closestIndexTo(dateToCompare: ZonedDateTime, datesArray: ZonedDateTime[]): number | null {
  if (datesArray.length === 0) return null;
  
  let closestIndex = 0;
  let closestDiff = Math.abs(datesArray[0].epochMilliseconds - dateToCompare.epochMilliseconds);
  
  for (let i = 1; i < datesArray.length; i++) {
    const diff = Math.abs(datesArray[i].epochMilliseconds - dateToCompare.epochMilliseconds);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = i;
    }
  }
  
  return closestIndex;
}
