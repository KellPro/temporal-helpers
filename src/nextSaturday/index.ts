import { nextDay } from "../nextDay/index.js";

export function nextSaturday(date: Parameters<typeof nextDay>[0]): ReturnType<typeof nextDay> {
  return nextDay(date, 6);
}
