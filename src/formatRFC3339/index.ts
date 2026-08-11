import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface FormatRFC3339Options {
  fractionDigits?: 0 | 1 | 2 | 3;
}

function pad(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

export function formatRFC3339(
  date: ZonedDateTime,
  options?: FormatRFC3339Options,
): string {
  const fractionDigits = options?.fractionDigits ?? 0;

  const year = pad(date.year, 4);
  const month = pad(date.month, 2);
  const day = pad(date.day, 2);
  const hour = pad(date.hour, 2);
  const minute = pad(date.minute, 2);
  const second = pad(date.second, 2);

  let fractionalSecond = "";
  if (fractionDigits > 0) {
    const fractionalSeconds = Math.trunc(
      date.millisecond * Math.pow(10, fractionDigits - 3),
    );
    fractionalSecond = "." + pad(fractionalSeconds, fractionDigits);
  }

  let offset = date.offset;
  if (offset === "+00:00" || offset === "-00:00") {
    offset = "Z";
  }

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${fractionalSecond}${offset}`;
}
