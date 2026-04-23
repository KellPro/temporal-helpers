import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

export interface FormatISOOptions {
  format?: "extended" | "basic";
  fractionalSecondDigits?: number;
}

export function formatISO(date: ZonedDateTime, options?: FormatISOOptions): string {
  const format = options?.format ?? "extended";
  const fractionalDigits = options?.fractionalSecondDigits ?? 0;
  
  const year = String(date.year).padStart(4, "0");
  const month = String(date.month).padStart(2, "0");
  const day = String(date.day).padStart(2, "0");
  const hour = String(date.hour).padStart(2, "0");
  const minute = String(date.minute).padStart(2, "0");
  const second = String(date.second).padStart(2, "0");
  
  let ms = "";
  if (fractionalDigits > 0) {
    const msStr = String(date.millisecond).padStart(3, "0").slice(0, fractionalDigits);
    ms = "." + msStr;
  }
  
  const separator = format === "basic" ? "" : "-";
  const timeSeparator = format === "basic" ? "" : ":";
  
  const dateStr = `${year}${separator}${month}${separator}${day}`;
  const timeStr = `${hour}${timeSeparator}${minute}${timeSeparator}${second}${ms}`;
  
  return `${dateStr}T${timeStr}${date.toString().slice(-6)}`;
}
