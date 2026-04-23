import { previousDay } from "../previousDay/index.js";

export function previousSaturday(date: Parameters<typeof previousDay>[0]): ReturnType<typeof previousDay> {
  return previousDay(date, 6);
}
