import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export function setQuarter(date: ZonedDateTime, quarter: number): ZonedDateTime {
  const currentQuarter = Math.ceil(date.month / 3);
  const diff = quarter - currentQuarter;
  return date.add({ months: diff * 3 });
}
