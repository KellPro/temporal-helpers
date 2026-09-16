import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface FormatISOOptions {
  format?: "extended" | "basic";
  representation?: "complete" | "date" | "time";
  fractionDigits?: 0 | 1 | 2 | 3;
}

export function formatISO(date: ZonedDateTime, options?: FormatISOOptions): string {
  const format = options?.format ?? "extended";
  const representation = options?.representation ?? "complete";
  const fractionDigits = options?.fractionDigits ?? 0;

  const dateDelimiter = format === "basic" ? "" : "-";
  const timeDelimiter = format === "basic" ? "" : ":";

  let result = "";

  if (representation !== "time") {
    const year = String(date.year).padStart(4, "0");
    const month = String(date.month).padStart(2, "0");
    const day = String(date.day).padStart(2, "0");

    result = `${year}${dateDelimiter}${month}${dateDelimiter}${day}`;
  }

  if (representation !== "date") {
    const hour = String(date.hour).padStart(2, "0");
    const minute = String(date.minute).padStart(2, "0");
    const second = String(date.second).padStart(2, "0");

    let fractionalSecond = "";
    if (fractionDigits > 0) {
      fractionalSecond =
        "." + String(date.millisecond).padStart(3, "0").slice(0, fractionDigits);
    }

    let offset = date.offset;
    if (offset === "+00:00" || offset === "-00:00") {
      offset = "Z";
    }

    const separator = result === "" ? "" : "T";
    const time = `${hour}${timeDelimiter}${minute}${timeDelimiter}${second}${fractionalSecond}`;

    result = `${result}${separator}${time}${offset}`;
  }

  return result;
}
