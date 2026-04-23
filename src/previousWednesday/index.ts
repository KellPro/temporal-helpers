import { previousDay } from "../previousDay/index.js";

export function previousWednesday(date: Parameters<typeof previousDay>[0]): ReturnType<typeof previousDay> {
  return previousDay(date, 3);
}
