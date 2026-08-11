import { Temporal } from "@js-temporal/polyfill";
import { add } from "../add/index.js";
import type { Duration } from "../intervalToDuration/index.js";

type ZonedDateTime = Temporal.ZonedDateTime;

export function sub(date: ZonedDateTime, duration: Duration): ZonedDateTime {
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

  return add(date, {
    years: -years,
    months: -months,
    weeks: -weeks,
    days: -days,
    hours: -hours,
    minutes: -minutes,
    seconds: -seconds,
    milliseconds: -milliseconds,
  });
}
