import { NumberAbbreviatorPipe } from "./number-abbreviator.pipe";

describe("NumberAbbreviatorPipe", () => {
  it("create an instance", () => {
    const pipe = new NumberAbbreviatorPipe();
    expect(pipe).toBeTruthy();
  });
});
