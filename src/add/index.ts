import { Temporal } from "@js-temporal/polyfill";
import { addDays } from "../addDays/index.js";
import { addMilliseconds } from "../addMilliseconds/index.js";
import { addMonths } from "../addMonths/index.js";
import type { Duration } from "../intervalToDuration/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function add(date: ZonedDateTime, duration: Duration): ZonedDateTime {
  const {
    years = 0,
    months = 0,
    weeks = 0,
    days = 0,
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  } = duration;

  let result = date;

  if (months || years) {
    result = addMonths(result, months + years * 12);
  }

  if (days || weeks) {
    result = addDays(result, days + weeks * 7);
  }

  const minutesToAdd = minutes + hours * 60;
  const secondsToAdd = seconds + minutesToAdd * 60;
  const msToAdd = secondsToAdd * 1000 + milliseconds;

  if (msToAdd) {
    result = addMilliseconds(result, msToAdd);
  }

  return result;
}
