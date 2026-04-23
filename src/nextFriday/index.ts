import { nextDay } from "../nextDay/index.js";

export function nextFriday(date: Parameters<typeof nextDay>[0]): ReturnType<typeof nextDay> {
  return nextDay(date, 5);
}
