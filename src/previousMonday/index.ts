import { previousDay } from "../previousDay/index.js";

export function previousMonday(date: Parameters<typeof previousDay>[0]): ReturnType<typeof previousDay> {
  return previousDay(date, 1);
}
