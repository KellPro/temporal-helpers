import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface SetValues {
  year?: number;
  month?: number;
  date?: number;
  day?: number;
  hours?: number;
  hour?: number;
  minutes?: number;
  minute?: number;
  seconds?: number;
  second?: number;
  milliseconds?: number;
  millisecond?: number;
}

function pickAlias(
  values: SetValues,
  a: keyof SetValues,
  b: keyof SetValues,
  label: string,
): number | undefined {
  const hasA = values[a] != null;
  const hasB = values[b] != null;
  if (hasA && hasB) {
    throw new RangeError(`Cannot set both "${a}" and "${b}" for ${label}`);
  }
  if (hasA) return values[a] as number;
  if (hasB) return values[b] as number;
  return undefined;
}

export function set(date: ZonedDateTime, values: SetValues): ZonedDateTime {
  const day = pickAlias(values, "day", "date", "day of month");
  const hour = pickAlias(values, "hour", "hours", "hour");
  const minute = pickAlias(values, "minute", "minutes", "minute");
  const second = pickAlias(values, "second", "seconds", "second");
  const millisecond = pickAlias(
    values,
    "millisecond",
    "milliseconds",
    "millisecond",
  );

  const patch: Temporal.ZonedDateTimeLike = {};

  if (values.year != null) patch.year = values.year;
  if (values.month != null) patch.month = values.month;
  if (day != null) patch.day = day;
  if (hour != null) patch.hour = hour;
  if (minute != null) patch.minute = minute;
  if (second != null) patch.second = second;
  if (millisecond != null) patch.millisecond = millisecond;

  if (Object.keys(patch).length === 0) {
    return date;
  }

  return date.with(patch);
}
