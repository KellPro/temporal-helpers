import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface FormatISO9075Options {
  format?: "extended" | "basic";
  representation?: "complete" | "date" | "time";
}

function pad(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

export function formatISO9075(
  date: ZonedDateTime,
  options?: FormatISO9075Options,
): string {
  const format = options?.format ?? "extended";
  const representation = options?.representation ?? "complete";

  const dateDelimiter = format === "extended" ? "-" : "";
  const timeDelimiter = format === "extended" ? ":" : "";

  let result = "";

  if (representation !== "time") {
    result = `${pad(date.year, 4)}${dateDelimiter}${pad(date.month, 2)}${dateDelimiter}${pad(date.day, 2)}`;
  }

  if (representation !== "date") {
    const time = `${pad(date.hour, 2)}${timeDelimiter}${pad(date.minute, 2)}${timeDelimiter}${pad(date.second, 2)}`;
    const separator = result === "" ? "" : " ";
    result = `${result}${separator}${time}`;
  }

  return result;
}
