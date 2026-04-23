import { describe, it, expect } from "vitest";
import { endOfYesterday } from "../index.js";

describe("endOfYesterday", () => {
  it("returns end of yesterday", () => {
    const result = endOfYesterday();
    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
    expect(result.second).toBe(59);
  });
});
