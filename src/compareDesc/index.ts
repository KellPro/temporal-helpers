import { compareAsc } from "../compareAsc/index.js";

export function compareDesc(dateLeft: Parameters<typeof compareAsc>[0], dateRight: Parameters<typeof compareAsc>[1]): number {
  const result = compareAsc(dateLeft, dateRight);
  return result === 0 ? 0 : -result;
}
