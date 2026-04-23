import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

interface FormatToken {
  char: string;
  fn: (date: ZonedDateTime) => string;
}

const tokens: FormatToken[] = [
  { char: "yyyy", fn: (d) => String(d.year).padStart(4, "0") },
  { char: "yy", fn: (d) => String(d.year).slice(-2) },
  { char: "y", fn: (d) => String(d.year) },
  { char: "MMMM", fn: (d) => d.toLocaleString("en-US", { month: "long" }) },
  { char: "MMM", fn: (d) => d.toLocaleString("en-US", { month: "short" }) },
  { char: "MM", fn: (d) => String(d.month).padStart(2, "0") },
  { char: "M", fn: (d) => String(d.month) },
  { char: "dd", fn: (d) => String(d.day).padStart(2, "0") },
  { char: "d", fn: (d) => String(d.day) },
  { char: "HH", fn: (d) => String(d.hour).padStart(2, "0") },
  { char: "H", fn: (d) => String(d.hour) },
  { char: "hh", fn: (d) => String(d.hour > 12 ? d.hour - 12 : d.hour).padStart(2, "0") },
  { char: "h", fn: (d) => String(d.hour > 12 ? d.hour - 12 : d.hour) },
  { char: "mm", fn: (d) => String(d.minute).padStart(2, "0") },
  { char: "m", fn: (d) => String(d.minute) },
  { char: "ss", fn: (d) => String(d.second).padStart(2, "0") },
  { char: "s", fn: (d) => String(d.second) },
  { char: "SSS", fn: (d) => String(d.millisecond).padStart(3, "0") },
  { char: "A", fn: (d) => (d.hour >= 12 ? "PM" : "AM") },
  { char: "a", fn: (d) => (d.hour >= 12 ? "pm" : "am") },
  { char: "ZZ", fn: (d) => d.toString().split("[")[1]?.replace("]", "") || "" },
  { char: "X", fn: (d) => String(Math.floor(d.epochSeconds)) },
];

function escapeString(str: string): string {
  return str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
}

export function format(date: ZonedDateTime, formatStr: string): string {
  let result = formatStr;

  for (const token of tokens) {
    const regex = new RegExp(escapeString(token.char), "g");
    result = result.replace(regex, token.fn(date));
  }

  return result;
}
