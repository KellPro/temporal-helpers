import { previousDay } from "../previousDay/index.js";

export function previousSunday(date: Parameters<typeof previousDay>[0]): ReturnType<typeof previousDay> {
  return previousDay(date, 7);
}
