import { describe, it, expect } from "vitest";
import { endOfTomorrow } from "../index.js";

describe("endOfTomorrow", () => {
  it("returns end of tomorrow", () => {
    const result = endOfTomorrow();
    expect(result.hour).toBe(23);
    expect(result.minute).toBe(59);
    expect(result.second).toBe(59);
  });
});
