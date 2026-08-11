import { Temporal } from "@js-temporal/polyfill";

type ZonedDateTime = Temporal.ZonedDateTime;

const formattingTokensRegExp = /(\w)\1*|''|'(''|[^'])+('|$)|./g;
const escapedStringRegExp = /^'([^]*?)'?$/;
const doubleQuoteRegExp = /''/g;
const unescapedLatinCharacterRegExp = /[a-zA-Z]/;

function pad(value: number, length: number): string {
  return String(value).padStart(length, "0");
}

const lightFormatters: Record<
  string,
  (date: ZonedDateTime, token: string) => string
> = {
  y(date, token) {
    const year = date.year > 0 ? date.year : 1 - date.year;
    return pad(token === "yy" ? year % 100 : year, token.length);
  },
  M(date, token) {
    return token === "M" ? String(date.month) : pad(date.month, 2);
  },
  d(date, token) {
    return pad(date.day, token.length);
  },
  a(date, token) {
    const dayPeriod = date.hour / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriod.toUpperCase();
      case "aaa":
        return dayPeriod;
      case "aaaaa":
        return dayPeriod[0];
      case "aaaa":
      default:
        return dayPeriod === "am" ? "a.m." : "p.m.";
    }
  },
  h(date, token) {
    return pad(date.hour % 12 || 12, token.length);
  },
  H(date, token) {
    return pad(date.hour, token.length);
  },
  m(date, token) {
    return pad(date.minute, token.length);
  },
  s(date, token) {
    return pad(date.second, token.length);
  },
  S(date, token) {
    const fractionalSeconds = Math.trunc(
      date.millisecond * Math.pow(10, token.length - 3),
    );
    return pad(fractionalSeconds, token.length);
  },
};

function cleanEscapedString(input: string): string {
  const matches = input.match(escapedStringRegExp);
  if (!matches) return input;
  return matches[1].replace(doubleQuoteRegExp, "'");
}

export function lightFormat(date: ZonedDateTime, formatStr: string): string {
  const tokens = formatStr.match(formattingTokensRegExp);
  if (!tokens) return "";

  return tokens
    .map((substring) => {
      if (substring === "''") {
        return "'";
      }

      const firstCharacter = substring[0];
      if (firstCharacter === "'") {
        return cleanEscapedString(substring);
      }

      const formatter = lightFormatters[firstCharacter];
      if (formatter) {
        return formatter(date, substring);
      }

      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
        throw new RangeError(
          "Format string contains an unescaped latin alphabet character `" +
            firstCharacter +
            "`",
        );
      }

      return substring;
    })
    .join("");
}
