import { nextDay } from "../nextDay/index.js";

export function nextMonday(date: Parameters<typeof nextDay>[0]): ReturnType<typeof nextDay> {
  return nextDay(date, 1);
}
