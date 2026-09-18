import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

interface FormatToken {
  char: string;
  fn: (date: ZonedDateTime) => string;
}

function ordinalDaySuffix(day: number): string {
  if (day % 100 >= 11 && day % 100 <= 13) {
    return "th";
  }
  return ["th", "st", "nd", "rd"][day % 10] || "th";
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
  { char: "do", fn: (d) => String(d.day) + ordinalDaySuffix(d.day) },
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
  { char: "X", fn: (d) => String(Math.floor(d.epochMilliseconds / 1000)) },
];

// Longest tokens first so e.g. "yyyy" wins over "yy" and "do" over "d" in the
// combined alternation.
const tokenPattern = tokens
  .slice()
  .sort((a, b) => b.char.length - a.char.length)
  .map((token) => token.char)
  .join("|");

const tokenRegex = new RegExp(tokenPattern, "g");

export function format(date: ZonedDateTime, formatStr: string): string {
  // One combined pass: replacing token-by-token over the accumulated result
  // re-renders token characters inside already-rendered text ("August" feeds
  // the A and s passes and comes out "AMugu0t").
  return formatStr.replace(tokenRegex, (matched) => {
    const token = tokens.find((candidate) => candidate.char === matched);
    return token ? token.fn(date) : matched;
  });
}
