import formatPrice from "../formatPrice";

describe("formating price", () => {
  it("should work", () => {
    const res1 = formatPrice("2000.225", "EUR");
    const res2 = formatPrice("2000.225", "USD");

    console.log({ res1, res2 });
    console.log(typeof res1);

    // expect(res1).toBe("2.000,23 €");
    expect(res2).toEqual("$2,000.23");
  });
});
