import { describe, it, expect } from "vitest";
import { format } from "./index.js";
import { Temporal } from "@js-temporal/polyfill";

describe("format", () => {
  it("formats date with year", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
    expect(format(date, "yyyy")).toBe("2024");
    expect(format(date, "yy")).toBe("24");
  });

  it("formats date with month", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
    expect(format(date, "MMMM")).toBe("July");
    expect(format(date, "MMM")).toBe("Jul");
    expect(format(date, "MM")).toBe("07");
    expect(format(date, "M")).toBe("7");
  });

  it("formats date with day", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
    expect(format(date, "dd")).toBe("10");
    expect(format(date, "d")).toBe("10");
  });

  it("formats time", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
    expect(format(date, "HH:mm:ss")).toBe("14:30:00");
    expect(format(date, "hh:mm A")).toBe("02:30 PM");
  });

  it("formats full date", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
    expect(format(date, "yyyy-MM-dd")).toBe("2024-07-10");
  });
});
