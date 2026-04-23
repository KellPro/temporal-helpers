import { addSeconds } from "../addSeconds/index.js";

export interface SubSecondsOptions {
  relativeTo?: never;
}

export function subSeconds(date: Parameters<typeof addSeconds>[0], amount: number): ReturnType<typeof addSeconds> {
  return addSeconds(date, -amount);
}
