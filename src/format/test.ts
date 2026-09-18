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

  it("formats ordinal day with do", () => {
    const date = Temporal.ZonedDateTime.from("2024-07-10T14:30:00.000+02:00[Europe/Paris]");
    expect(format(date, "do")).toBe("10th");
    expect(format(date, "MMMM do, yyyy")).toBe("July 10th, 2024");

    const third = Temporal.ZonedDateTime.from("2024-08-03T09:15:00.000-05:00[America/Chicago]");
    expect(format(third, "do")).toBe("3rd");

    const eleventh = Temporal.ZonedDateTime.from("2024-07-11T09:15:00.000-05:00[America/Chicago]");
    expect(format(eleventh, "do")).toBe("11th");

    const thirteenth = Temporal.ZonedDateTime.from("2024-07-13T09:15:00.000-05:00[America/Chicago]");
    expect(format(thirteenth, "do")).toBe("13th");

    const twentySecond = Temporal.ZonedDateTime.from("2024-07-22T09:15:00.000-05:00[America/Chicago]");
    expect(format(twentySecond, "do")).toBe("22nd");
  });

  it("does not re-replace tokens inside rendered text", () => {
    // "August" contains the A and s token characters; a token-by-token pass
    // over the accumulated string corrupts the rendered month.
    const date = Temporal.ZonedDateTime.from("2024-08-03T09:15:00.000-05:00[America/Chicago]");
    expect(format(date, "MMMM")).toBe("August");
    expect(format(date, "MMMM do, yyyy a")).toBe("August 3rd, 2024 am");
  });
});
